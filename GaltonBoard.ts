/**
 * \author Zachary Justin Wartell
 */

import { Renderer, Geometry, Program, Mesh, Mat3, Vec3 } from 'ogl';

/**
 * - \ref https://en.wikipedia.org/wiki/Galton_board
 */

//# <code>
class Particle // akka pseudo 'Point Mass'
{    
    cartesianCoordinate = new CartesianCoordinate();    
    galtonCoordinate = new GaltonCoordinate();        
    galtonBoard : GaltonBoard;
    constructor(galtonBoard : GaltonBoard)
    {                     
        this.galtonBoard = galtonBoard;
    }

    get level() { return this.galtonBoard.level;}
}


enum LastBounce{LEFT,RIGHT,INDETERMINATE};
//# <code>
class Peg
{

    /**
     * \todo [space/time trade-off] consider ways to avoid storing these two values to reduce memory 
     */
    cartesianCoordinate = new Vec3();    
    galtonCoordinate = new Vec3();   
    
    lastBounce : LastBounce = LastBounce.INDETERMINATE;

    // board Peg is on (\todo consider memory over head of storing this as an reference variable)
    galtonBoard : GaltonBoard;
    constructor(galtonBoard : GaltonBoard, gx : number, gy: number)
    {                     
        this.galtonBoard = galtonBoard;
        this.galtonCoordinate.x = gx;
        this.galtonCoordinate.y = gy;
        this.galtonCoordinate.z = 1.0;
        this.cartesianCoordinate.copy(this.galtonCoordinate);
        this.cartesianCoordinate.applyMatrix3(GaltonBoard.GALTON_TO_CARTESIAN);

    }

    get level() { return this.galtonBoard.level;}    
}
//# </code>

//# <code>
class GaltonBoard
{
    static PEG_LAYERS_PER_BOARD = 10;
    
    level : number;
    inputSlotCount : number;
    pegCount : number;
    inputSlots : Array<Particle>;
    outputSlotCount : number;
    outputSlots : Array<Particle>;

    geometry : Float32Array;

    pegs : Array<Peg>;
    constructor(level : number)
    {
        this.level = level; 
        this.inputSlotCount = level = 0 ? 1 : GaltonBoard.PEG_LAYERS_PER_BOARD * (level - 1);
        this.inputSlots =  new Array<Particle>(this.inputSlotCount);     
        this.outputSlotCount = GaltonBoard.PEG_LAYERS_PER_BOARD * (level + 2);
        this.outputSlots = new Array<Particle>(this.outputSlotCount);     

        this.pegCount = GaltonBoard.PEG_LAYERS_PER_BOARD*(GaltonBoard.PEG_LAYERS_PER_BOARD+1)/2 + GaltonBoard.PEG_LAYERS_PER_BOARD*this.inputSlotCount;

        this.pegs = new Array<Peg>(this.pegCount);
        let gx : number = 0,gy : number = 0;
        let lpCount = this.inputSlotCount+1;  // 'levelPegCount' | number of pegs at relative level in this GaltonBoard
        for (let p of this.pegs)
        {
            p = new Peg(this,gx,gy);
            gx++;
            gy++;
            if (gx == lpCount)         
                {
                    gy=0;                    
                    lpCount++;
                }   
        }
        this.geometry = new Float32Array(this.pegCount*2);
    }

    initGeometry() : void
    {
        let i = 0;
        for (let p of this.pegs)
        {
            this.geometry [i*2]   = p.cartesianCoordinate.x;
            this.geometry [i*2+1] = p.cartesianCoordinate.x;
            i++;
        }
    }

    dropParticles() : void
    {
        for (let b of this.inputSlots)
        {
            this.dropParticle(b);
        }
    }    
    dropParticle(b : Particle) : void
    {

    }

    static SQUARE_SIDE = 1.0;
    /**
     * Galton Coordinate System origin is at (0,0) of the "base" Cartesian Coordinate System.  
     * Galton y-axis is length SQUARE_SIDE and rotated -135 degrees (90 + 45) relative to the Cartisian system y-axis (hence it points diagonally 'down and to the right')
     * Galton x-axis is length SQUARE_SIDE and rotated -135 degrees (90 + 45) relative to the Cartisian system x-axis (hence it points diagonally 'down and to the left')
     * 
     * Peg with PegIndex [0,0] is center at (0,0)
     */
    static GALTON_O = new Vec3 (0,0,1);  // peg with peg-index (0,0) is at (0,0) of Cartesian CSordinate system, which is conincident with origin of Galton Coordniate System
    static GALTON_X = new Vec3 (-GaltonBoard.SQUARE_SIDE/Math.SQRT2,-GaltonBoard.SQUARE_SIDE/Math.SQRT2,0);
    static GALTON_Y = new Vec3 ( GaltonBoard.SQUARE_SIDE/Math.SQRT2,-GaltonBoard.SQUARE_SIDE/Math.SQRT2,0);
    /**
     * Convert Galton Coordinate _to_ Cartesian Coordinate (same matrix requred to to superimpose Cartesian CS _onto_ Galton CS )
     */
    static GALTON_TO_CARTESIAN = new Mat3 (GaltonBoard.GALTON_X[0],GaltonBoard.GALTON_X[1],GaltonBoard.GALTON_X[2],
                                           GaltonBoard.GALTON_Y[0],GaltonBoard.GALTON_Y[1],GaltonBoard.GALTON_Y[2],
                                           GaltonBoard.GALTON_O[0],GaltonBoard.GALTON_O[1],GaltonBoard.GALTON_O[2]);


}
//# </code>

//# <code>
class CartesianCoordinate
{
    x : number;
    y : number;
    //static Y_INC = 1;
    //static X_LEFT_INC = -0.5;
    //static X_RIGHT_INC = 0.5;
    constructor()
    {
        this.x = 0;
        this.y = 0;
    }
}
//# </code>

//# <code>
class GaltonCoordinate
{
    x : number;
    y : number;
    constructor()
    {
        this.x = 0;
        this.y = 0;
    }
}
//# </code>
    


//# <code>
class GaltonBoardCascade
{
    static Particle_COUNT = 1000;
    Particles : Array<Particle> = new Array<Particle> (GaltonBoardCascade.Particle_COUNT);
    galtonBoards : Array<GaltonBoard>;

    constructor(boardCount : number)
    {
        this.galtonBoards = new Array<GaltonBoard>(boardCount);
        for (let i = 0 ; i = boardCount; i++)
            this.galtonBoards.push(new GaltonBoard(i))
    }

    dropParticlesToNextLevel()
    {

    }
}
//# </code>
