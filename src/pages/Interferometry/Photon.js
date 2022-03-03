class Photon {
    constructor(posX, posY, radius, speed){
        this.posX = posX + radius;
        this.posY = posY + radius;
        this.radius = radius;
        this.speedX = speed;
        this.speedY = speed;
    }

    moveTo(context, width, height) {
        this.posX = this.posX + this.speedX;
        if (this.posX > width-this.radius) {
            this.speedX *= -1;
        } else if (this.posX < this.radius) {
            this.speedX *= -1;
        }
        this.posY = this.posY + this.speedY;
        if (this.posY > height - this.radius) {
            this.speedY *= -1;
        } else if (this.posY < this.radius) {
            this.speedY *= -1;
        } 
        this.drawParticle(context)
    }
    
    drawParticle(context){
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}

export default Photon;