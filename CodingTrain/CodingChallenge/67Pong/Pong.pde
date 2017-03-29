import processing.sound.*;

Puck puck;


SoundFile burp;
SoundFile bone;

Paddle left;
Paddle right;

int leftScore;
int rightScore;


void setup(){
        size(600,400);
        burp = new SoundFile(this, "burp.mp3");
        bone = new SoundFile(this, "bone.mp3");
        puck = new Puck();
        left = new Paddle(true);
        right = new Paddle(false);
}

void draw(){
        background(0);

        puck.checkPaddleLeft(left);
        puck.checkPaddleRight(right);

        left.show();
        left.update();
        right.show();
        right.update();

        puck.update();
        puck.edges();
        puck.show();

        fill(255);
        textSize(25);
        text(leftScore, 200, 40);
        text(rightScore, width-250, 40);
}


void keyReleased(){
        left.move(0);
        right.move(0);

}


void keyPressed(){

        if(key == 'a') {
                left.move(-10);
        }else if (key == 'z') {
                left.move(10);
        }

        if(key == 'k') {
                right.move(-10);
        }else if (key == 'm') {
                right.move(10);
        }

}
