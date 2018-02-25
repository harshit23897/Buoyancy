/*
    Author: Harshit Jain
    Institution: IIIT Vadodara
*/

/*----------------------  Global Variables ------------------*/
var helpContent;
var densityOfWood;
var acceleration;
var count;
var previousWoodenCube;
var line2;
var volume;
var massOfBlock;
var group;
var numberOfBlocksAdded;
var mainCuboid;
var geometry;
var tempvar = 0;
var count1 = 0;
var material;
var wireframe;
var cylinder;
var cylinder1;
var mainLine2;
var currentYValue;
var group1;
var group2;
var temp;
var tempcurrentYValue;
var heightSinked;
var heightSinked1;
var cylinder;
var line;
var cubesAdded;
var numberOfBlocks;
var primaryBlockType;
var volumeOfWaterDisplaced;

/*----------------------  Initialization ------------------*/

function initialiseVariables()
{
    count = 0;
    numberOfBlocksAdded = 0;
    group = new THREE.Group();
    group1 = new THREE.Group();
    group2 = new THREE.Group();
    heightSinked = 0;
    cubesAdded = 0;
    tempvar = 0;
    numberOfBlocks = [0, 0, 0, 0, 0];
    primaryBlockType = [1, 0, 0]
}

function initialiseOtherVariables()
{
    densityOfWood = 110;
    acceleration = 9.8;
}


function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Buoyancy Experiment</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a block floating in water which sinks in water if enough weight is added to it.</p>";
    helpContent = helpContent + "<h3>Animation Control</h3>";
    helpContent = helpContent + "<p>The top line has a start/stop button which is initially set to start.</p>";
    helpContent = helpContent + "<p>Click on start which will change the button to stop.</p>";
    helpContent = helpContent + "<p>Now the animation has started.</p>";
    helpContent = helpContent + "<p>Initially, there is a wooden block in the water.</p>";
    helpContent = helpContent + "<p>The block can be changed by clicking on the Checkboxes in the control menu.</p>";
    helpContent = helpContent + "<p>Now click on weights given in the control menu.</p>";
    helpContent = helpContent + "<p>Once a block is selected and weight is put on it, then it cannot be changed.</p>";
    helpContent = helpContent + "<p>As you keep on adding more and more weight, the block will sink more and more in water.</p>";
    helpContent = helpContent + "<p>Once enough weight is added, the block will sink in water.</p>";
    helpContent = helpContent + "<p>Click on reset button to start the expeiment again.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Buoyancy Experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows a block floating in water which sinks in water if enough weight is added to it.</p>";
    infoContent = infoContent + "<h3>Buoyancy</h3>";
    infoContent = infoContent + "<p>When an object is placed in water, buoyant force acts on it that opposes the weight of an immersed object.</p>";
    infoContent = infoContent + "<p>The amount of buoyant force acting on an object is B = p*V*g.</p>";
    infoContent = infoContent + "<p>where, p = density of fluid, V = volume of fluid displaced by the object, g = gravitational force.</p>";
    infoContent = infoContent + "<p>Now, there is also another force acting on an object in downward direction which is gravitational force F = m*g.</p>";
    infoContent = infoContent + "<p>where, m = mass of object, g = gravitational force.</p>";
    infoContent = infoContent + "<p>Hence, the object will remain in equilibrium if buoyant force(B) equals gravitational force(F).</p>";
    infoContent = infoContent + "<p>Hence, if we keep on adding more and more weight, the gravitational force will increase and after a point the object will sink.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

/*----------------------  Initialise scene to add background color to window and add Input Checkboxes  ------------------*/
function initialiseScene()
{
    PIEscene.background = new THREE.Color( 0xffffff );
    PIEaddInputCheckbox("Cube1", true, cube1);
    PIEaddInputCheckbox("Cube2", false, cube2);
    PIEaddInputCheckbox("Cube3", false, cube3);
    PIEaddInputCommand("100g", onehundredGram);
    PIEaddInputCommand("200g", twohundredGram);
    PIEaddInputCommand("400g", fourhundredGram);
    PIEaddInputCommand("500g", fivehundredGram);
    PIEaddInputCommand("1000g", oneKiloGram);

    PIEaddDisplayCheckbox("Cube1", true, cube1);
    PIEaddDisplayCheckbox("Cube2", false, cube2);
    PIEaddDisplayCheckbox("Cube3", false, cube3);
    PIEaddDisplayCommand("100g", onehundredGram);
    PIEaddDisplayCommand("200g", twohundredGram);
    PIEaddDisplayCommand("400g", fourhundredGram);
    PIEaddDisplayCommand("500g", fivehundredGram);
    PIEaddDisplayCommand("1000g", oneKiloGram);
}

/*----------------------  Functions for different weights to keep track of number of blocks of different type  ------------------*/

function onehundredGram()
{
    cubesAdded++;
    numberOfBlocks[0]++;
    addBlock();
}

function twohundredGram()
{
    cubesAdded++;
    numberOfBlocks[1]++;
    addBlock();
}

function fourhundredGram()
{
    cubesAdded++;
    numberOfBlocks[2]++;
    addBlock();
}

function fivehundredGram()
{
    cubesAdded++;
    numberOfBlocks[3]++;
    addBlock();
}

function oneKiloGram()
{
    cubesAdded++;
    numberOfBlocks[4]++;
    addBlock();
}

/*----------------------  Function to check if the wooden block is submerged in water or not  ------------------*/

function checkIfWoodenBlockInWater()
{
    if(group.position.y <= 3)
    {
        animate();
    }
}

function animate()
{
    PIErender();
    PIEstartAnimation();
}

/*----------------------  Function to add weight  ------------------*/
function addBlock()
{
    if(group.position.y > 2)
    {
        numberOfBlocksAdded++;
        cuboidMaterial = new THREE.MeshBasicMaterial({color: 0x8C6529, side: THREE.DoubleSide, shading: THREE.FlatShading});
        cuboid = new THREE.Mesh( new THREE.CubeGeometry( 2 , 1, 2),  cuboidMaterial);

        tempcurrentYValue = group.position.y;

        if(primaryBlockType[0] == 1)
            cuboid.position.set(0, cubesAdded , 2);
        else if(primaryBlockType[1] == 1)
            cuboid.position.set(0, cubesAdded - 2*0.23, 2);
        else
            cuboid.position.set(0, cubesAdded - 2*0.35, 2);
        
        edges = new THREE.EdgesGeometry( new THREE.BoxBufferGeometry( 2, 1, 2 ) );
        line2 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );

        if(primaryBlockType[0] == 1)
            line2.position.set(0, cubesAdded, 2);
        else if(primaryBlockType[1] == 1)
            line2.position.set(0, cubesAdded - 2*0.23, 2);
        else
            line2.position.set(0, cubesAdded - 2*0.35, 2);

        group.remove(group2);
        group1.add(cuboid);
        group1.add(line2);

        group2.add(group1);
        group.add(group2);

        sink();
    }
}

/*----------------------  Functions for cube1, cube2 and cube3 which differ only in size but not volume.  ------------------*/

function cube1()
{
    if(numberOfBlocksAdded == 0)
    {
        PIEchangeDisplayCheckbox("Cube1", true);
        PIEchangeDisplayCheckbox("Cube2", false);
        PIEchangeDisplayCheckbox("Cube3", false);

        var p = 3;

        if(primaryBlockType[1] == 1)
        {
            p = 1;
            previousWoodenCube = 1;
            mainCuboid.position.y += 0.305;
            mainLine2.position.y += 0.305;
        }
        else if(primaryBlockType[2] == 1)
        {
            p = 2;
            previousWoodenCube = 2;
            mainCuboid.position.y += 0.49;
            mainLine2.position.y += 0.49;
        }   

        group.remove(mainCuboid);
        group.remove(mainLine2);

        primaryBlockType[0] = 1;
        primaryBlockType[1] = 0;
        primaryBlockType[2] = 0;

        mainCuboid.scale.set(1,1,1);
        mainLine2.scale.set(1,1,1);
        
        group.add(mainCuboid);
        group.add(mainLine2);
    }
}

function cube2()
{
    if(numberOfBlocksAdded == 0)
    {
        PIEchangeDisplayCheckbox("Cube1", false);
        PIEchangeDisplayCheckbox("Cube2", true);
        PIEchangeDisplayCheckbox("Cube3", false);

        var p = 3;

        if(primaryBlockType[0] == 1)
        {
            p = 1;
            previousWoodenCube = 0;
            mainCuboid.position.y -= 0.305;
            mainLine2.position.y -= 0.305;
        }
        else if(primaryBlockType[2] == 1)
        {
            p = 2;
            previousWoodenCube = 2;
            mainCuboid.position.y += 0.185;
            mainLine2.position.y += 0.185;
        }

        group.remove(mainCuboid);
        group.remove(mainLine2);

        primaryBlockType[0] = 0;
        primaryBlockType[1] = 1;
        primaryBlockType[2] = 0;

        mainCuboid.scale.set(1.2,0.695,1.2);
        mainLine2.scale.set(1.2,0.695,1.2);

        group.add(mainCuboid);
        group.add(mainLine2);
    }
}

function cube3()
{
    if(numberOfBlocksAdded == 0)
    {
        PIEchangeDisplayCheckbox("Cube1", false);
        PIEchangeDisplayCheckbox("Cube2", false);
        PIEchangeDisplayCheckbox("Cube3", true);

        var p = 3;

        if(primaryBlockType[0] == 1)
        {
            p = 1;
            previousWoodenCube = 0;
            mainCuboid.position.y -= 0.49;
            mainLine2.position.y -= 0.49;
        }
        else if(primaryBlockType[1] == 1)
        {
            p = 2;
            previousWoodenCube = 1;
            mainCuboid.position.y -= 0.185;
            mainLine2.position.y -= 0.185;
        }

        group.remove(mainCuboid);
        group.remove(mainLine2);

        primaryBlockType[0] = 0;
        primaryBlockType[1] = 0;
        primaryBlockType[2] = 1;

        mainCuboid.scale.set(1.4,0.510,1.4);
        mainLine2.scale.set(1.4,0.510,1.4);

        group.add(mainCuboid);
        group.add(mainLine2);
    }
}

/*----------------------  Function to add cylinder  ------------------*/

function addCylinder()
{
    geometry = new THREE.CylinderBufferGeometry( 5, 5, 10, 32, 1, true );
    material = new THREE.MeshBasicMaterial( {color: 0x777777} );
    wireframe = new THREE.WireframeGeometry( geometry );
    cylinder = new THREE.LineSegments( wireframe, material );
    cylinder.material.depthTest = false;
    cylinder.material.opacity = 0.8;
    cylinder.material.transparent = false;

    PIEaddElement(cylinder); 

    geometry = new THREE.CylinderBufferGeometry( 5, 5, 8, 100 );
    material = new THREE.MeshBasicMaterial( {color: 0x256d7b} );
    material.opacity = 0.5;
    material.transparent = true;
    cylinder1 = new THREE.Mesh( geometry, material );
    cylinder1.position.set(0, -1, 0);   
    cylinder.add( cylinder1 );
}

/*----------------------  Function to add Wooden Box  ------------------*/

function addWoodenBox()
{
    cuboidMaterial = new THREE.MeshBasicMaterial({color: 0x8C6529, side: THREE.DoubleSide, shading: THREE.FlatShading});
    mainCuboid = new THREE.Mesh( new THREE.CubeGeometry( 4 , 1, 4),  cuboidMaterial);
    mainCuboid.position.set(0, 0, 2);
    
    edges = new THREE.EdgesGeometry( new THREE.BoxBufferGeometry( 4, 1, 4 ) );
    mainLine2 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    mainLine2.position.set(0, 0, 2);

    group.add(mainCuboid);
    group.add(mainLine2);
    group.position.set(0, 3.6, 0);
    PIEaddElement(group);

    primaryBlockType[0] = 1;
    temp = 0.3;
    ++count1;

    sink();
}

/*----------------------  Function to calculate how much the block with or without weight has sunk in the water and update the weight  ------------------*/

function sink()
{
    volume = 0.0016;
    massOfBlock = (densityOfWood*volume);

    massOfBlock += (numberOfBlocks[0]*100)/1000;
    massOfBlock += (numberOfBlocks[1]*200)/1000;
    massOfBlock += (numberOfBlocks[2]*400)/1000;
    massOfBlock += (numberOfBlocks[3]*500)/1000;
    massOfBlock += (numberOfBlocks[4]*1000)/1000;

    heightSinked1 = heightSinked;

    volumeOfWaterDisplaced = massOfBlock/(1000);
    
    heightSinked = volumeOfWaterDisplaced/(volume);

    temp = heightSinked - heightSinked1;
    count = 0;

}

function loadExperimentElements()
{
    PIEsetExperimentTitle("Buoyancy");
    PIEsetDeveloperName("Harshit Jain");

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    initialiseVariables();

    /* initialise Other Variables */
    initialiseOtherVariables();

    addCylinder();
    addWoodenBox();

    document.getElementById("start").addEventListener("click", startanimation);

    PIEsetAreaOfInterest(20, -7,  -20, 15);
}

/*----------------------  Function to start new animation cycle  ------------------*/
function startanimation()
{
    PIEstartAnimation();
}

function resetExperiment()
{
    if(count1 >= 1)
    {
        PIEremoveElement(group);
        initialiseVariables();
        group = new THREE.Group();
        group1 = new THREE.Group();
        group2 = new THREE.Group();
        group.remove(mainLine2);
        group.remove(mainCuboid);
        PIEchangeDisplayCheckbox("Cube1", true);
        PIEchangeDisplayCheckbox("Cube2", false);
        PIEchangeDisplayCheckbox("Cube3", false);
    }
    addWoodenBox();
}

function updateExperimentElements(t, dt)
{
    if(group.position.y <= 3 && group.position.y >= -4.88)
    {
        ++tempvar;
        var current = group.position.y;
        group.position.set(0, current-0.08, 0);
        if(group.position.y <= -4.88)
        {
            PIEstopAnimation();
        }
    }
    else if(temp > 0 && group.position.y > 3)
    {
        if(temp >= 0.08)
        {
            ++count;
            temp -= 0.08;
            group.position.set(0, group.position.y - 0.08, 0);
        }
        else
        {
            group.position.set(0, group.position.y - temp, 0);
            temp = 0;
        }
    }
}