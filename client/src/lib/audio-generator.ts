export class AudioGenerator {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillator: OscillatorNode | null = null;
  private bufferSource: AudioBufferSourceNode | null = null;
  private isPlaying = false;
  private currentNoiseType: 'brown' | 'white' | null = null;

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  private async resumeAudioContext() {
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  private generateWhiteNoise(): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not initialized');
    
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  private generateBrownNoise(): AudioBuffer {
    if (!this.audioContext) throw new Error('Audio context not initialized');
    
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Boost the signal
    }

    return buffer;
  }

  async startNoise(type: 'brown' | 'white'): Promise<void> {
    if (!this.audioContext || !this.gainNode) return;

    await this.resumeAudioContext();

    if (this.isPlaying) {
      this.stopNoise();
    }

    try {
      const buffer = type === 'brown' ? this.generateBrownNoise() : this.generateWhiteNoise();
      
      this.bufferSource = this.audioContext.createBufferSource();
      this.bufferSource.buffer = buffer;
      this.bufferSource.loop = true;
      this.bufferSource.connect(this.gainNode);
      this.bufferSource.start();

      this.isPlaying = true;
      this.currentNoiseType = type;
    } catch (error) {
      console.error('Failed to start noise:', error);
    }
  }

  stopNoise(): void {
    if (this.bufferSource) {
      try {
        this.bufferSource.stop();
        this.bufferSource.disconnect();
      } catch (error) {
        console.error('Error stopping noise:', error);
      }
      this.bufferSource = null;
    }

    this.isPlaying = false;
    this.currentNoiseType = null;
  }

  setVolume(volume: number): void {
    if (this.gainNode) {
      // Convert percentage to gain (0-1 range)
      const gain = Math.max(0, Math.min(1, volume / 100));
      this.gainNode.gain.setValueAtTime(gain, this.audioContext?.currentTime || 0);
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  getCurrentNoiseType(): 'brown' | 'white' | null {
    return this.currentNoiseType;
  }

  cleanup(): void {
    this.stopNoise();
    if (this.audioContext?.state !== 'closed') {
      this.audioContext?.close();
    }
  }
}
