function main() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Bar {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }

    update(micInput) {
      this.height = micInput;
    }
    draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  // const bar1 = new Bar(10, 10, 100, 200, 'blue');
  const microphone = new Microphone();
  let bars = [];
  let barWidth = canvas.width / 256;
  function createBars() {
    for (let i = 0; i < 256; i++) {
      let color = "hsl(" + i * 2 + ", 100%, 50%)";
      bars.push(new Bar(i * barWidth, canvas.height / 2, 1, 20, color));
    }
  }
  createBars();
  console.log(bars);
  
  function animate() {
    if (microphone.initialized) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // generate audio simples from microphone
      const samples = microphone.getSamples();
      console.log(samples);
      // animate bars based on microphone data
      bars.forEach(function(bar) {
        bar.update(1);
        bar.draw(ctx);
      });
    }
    requestAnimationFrame(animate);
  }
  animate();
}
