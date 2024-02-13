let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevMouseX = 0;
  prevMouseY = 0;
  mouseX = 0;
  mouseY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      if (e.button === 0) {
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (this.holdingPaper) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        const deltaX = this.mouseX - this.prevMouseX;
        const deltaY = this.mouseY - this.prevMouseY;

        this.currentPaperX += deltaX;
        this.currentPaperY += deltaY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
      }
    });

    window.addEventListener('mouseup', () => {
      console.log('mouse button is released');
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
