
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

//# <code>
class Peg
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
//# </code>

//# <code>
class GaltonBoard
{
    static PEG_LAYERS_PER_BOARD = 10;
    level : number;
    inputSlotCount : number;
    inputSlots : Array<Particle>;
    outputSlotCount : number;
    outputSlots : Array<Particle>;
    constructor(level : number)
    {
        this.level = level;
        this.inputSlotCount = level = 0 ? 1 : GaltonBoard.PEG_LAYERS_PER_BOARD * (level - 1);
        this.inputSlots =  new Array<Particle>(this.inputSlotCount);     
        this.outputSlotCount = GaltonBoard.PEG_LAYERS_PER_BOARD * (level + 2);
        this.outputSlots = new Array<Particle>(this.outputSlotCount);     
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
}
//# </code>

//# <code>
class CartesianCoordinate
{
    x : number;
    y : number;
    static Y_INC = 1;
    static X_LEFT_INC = -0.5;
    static X_RIGHT_INC = 0.5;
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
    static Y_INC = 1;
    static X_LEFT_INC  = -1;
    static X_RIGHT_INC =  1;    
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
