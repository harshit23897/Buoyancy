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
var p;
var massOfBlock;
var group;
var numberOfBlocksAdded;
var mainCuboid;
var sinking;
var variable = 1;
var stack = [];
var heightStack = [];
var geometry;
var header;
var blockType;
var tempvar = 0;
var count1 = 0;
var material;
var wireframe;
var cylinder;
var cylinder1;
var cylinder1ScaleChange;
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
    sinking = 0.2;
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
    helpContent = helpContent + "<p>On the right side, you can see the cube dimensions and how much the main wooden block has sunk.</p>";
    helpContent = helpContent + "<p>Initially, there is a wooden block in the water.</p>";
    helpContent = helpContent + "<p>The block can be changed by clicking on the Checkboxes in the control menu.</p>";
    helpContent = helpContent + "<p>Now click on weights given in the control menu. There are five types of weights which are distinguished by color.</p>";
    helpContent = helpContent + "<p>Once a block is selected and weight is put on it, then it cannot be changed.</p>";
    helpContent = helpContent + "<p>As you keep on adding more and more weight, the block will sink more and more in water.</p>";
    helpContent = helpContent + "<p>If you want to remove weights then click on Remove Weight.</p>";
    helpContent = helpContent + "<p>Once enough weight is added, the block will sink in water.</p>";
    helpContent = helpContent + "<p>Click on reset button to start the experiment again.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
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
    infoContent = infoContent + "<p>On the opposite side, if we remove weight then the gravitational force will decrease and block will rise again.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

/*----------------------  Initialise scene to add background color to window and add Input Checkboxes  ------------------*/
function initialiseScene()
{
    PIEscene.background = new THREE.Color( 0xc6e2ff );
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

    PIEaddDisplayText("Cube Dimension", "2x1x2");
    PIEaddDisplayText("Sunk", sinking);
}

/*----------------------  Function to resize rendering when window is resized  ------------------*/
window.onresize = function(){
    console.log("Window size: "+window.innerWidth+"x"+window.innerHeight+"px");
    renderer.setSize(window.innerWidth,window.innerHeight);
    var aspectRatio = window.innerWidth/window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

/*----------------------  Functions for different weights to keep track of number of blocks of different type  ------------------*/

function onehundredGram()
{
    if(variable == 1)
    {
        cubesAdded++;
        numberOfBlocks[0]++;
        stack.push(1);
        if(numberOfBlocksAdded == 0)
        {
            heightSinked1 = 0;
            heightSinked = 0;
        }
        addBlock(1);
    }
}

function twohundredGram()
{
    if(variable == 1)
    {
        cubesAdded++;
        numberOfBlocks[1]++;
        stack.push(2);
        if(numberOfBlocksAdded == 0)
        {
            heightSinked1 = 0;
            heightSinked = 0;
        }
        addBlock(2);
    }
}

function fourhundredGram()
{
    if(variable == 1)
    {
        cubesAdded++;
        numberOfBlocks[2]++;
        stack.push(3);
        if(numberOfBlocksAdded == 0)
        {
            heightSinked1 = 0;
            heightSinked = 0;
        }
        addBlock(3);
    }   
}

function fivehundredGram()
{
    if(variable == 1)
    {
        cubesAdded++;
        numberOfBlocks[3]++;
        stack.push(4);
        if(numberOfBlocksAdded == 0)
        {
            heightSinked1 = 0;
            heightSinked = 0;
        }
        addBlock(4);
    }
}

function oneKiloGram()
{
    if(variable == 1)
    {
        cubesAdded++;
        numberOfBlocks[4]++;
        stack.push(5);
        if(numberOfBlocksAdded == 0)
        {
            heightSinked1 = 0;
            heightSinked = 0;
        }
        addBlock(5);
    }
}

function animate()
{
    if(variable == 1)
    {
        PIErender();
        PIEstartAnimation();
    }
}

/*----------------------  Function to add weight  ------------------*/

function addBlock(type)
{
    if(group.position.y > 2 && variable == 1)
    {
        numberOfBlocksAdded++;
        if(type == 1)
            cuboidMaterial = new THREE.MeshBasicMaterial({color: 0xDFC9BB, side: THREE.DoubleSide, shading: THREE.FlatShading});
        else if(type == 2)
            cuboidMaterial = new THREE.MeshBasicMaterial({color: 0xC0957B, side: THREE.DoubleSide, shading: THREE.FlatShading});
        else if(type == 3)
            cuboidMaterial = new THREE.MeshBasicMaterial({color: 0xB07B5A, side: THREE.DoubleSide, shading: THREE.FlatShading});
        else if(type == 4)
            cuboidMaterial = new THREE.MeshBasicMaterial({color: 0x714E3A, side: THREE.DoubleSide, shading: THREE.FlatShading});
        else
            cuboidMaterial = new THREE.MeshBasicMaterial({color: 0x483225, side: THREE.DoubleSide, shading: THREE.FlatShading});

        cuboid = new THREE.Mesh( new THREE.CubeGeometry( 2 , 1, 2),  cuboidMaterial);

        tempcurrentYValue = group.position.y;

        if(primaryBlockType[0] == 1)
            cuboid.position.set(0, cubesAdded + 0.02*cubesAdded, 2);
        else if(primaryBlockType[1] == 1)
            cuboid.position.set(0, cubesAdded - 2*0.23 + 0.02*cubesAdded, 2);
        else
            cuboid.position.set(0, cubesAdded - 2*0.35 + 0.02*cubesAdded, 2);
        
        edges = new THREE.EdgesGeometry( new THREE.BoxBufferGeometry( 2, 1, 2 ) );
        line2 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );

        if(primaryBlockType[0] == 1)
            line2.position.set(0, cubesAdded + 0.02*cubesAdded, 2);
        else if(primaryBlockType[1] == 1)
            line2.position.set(0, cubesAdded - 2*0.23 + 0.02*cubesAdded, 2);
        else
            line2.position.set(0, cubesAdded - 2*0.35 + 0.02*cubesAdded, 2);

        group.remove(group2);
        group1.add(cuboid);
        group1.add(line2);

        group2.add(group1);
        group.add(group2);

        sink();
    }
}

/*----------------------  Function to remove weight  ------------------*/

function removeWeight()
{
    if(numberOfBlocksAdded > 0 && group.position.y >= 2 && variable == 1)
    {
        console.log()
        group.remove(group2);
        group2.remove(group1);
        group1.remove(group1.children[2*numberOfBlocksAdded-1]);
        group1.remove(group1.children[2*numberOfBlocksAdded-2]);
        numberOfBlocksAdded--;
        cubesAdded--;
        group2.add(group1);
        group.add(group2);
        blockType = stack.pop();
        numberOfBlocks[blockType-1]--;
        temp = -1*heightStack.pop();
    }
}

/*----------------------  Functions for cube1, cube2 and cube3 which differ only in size but not volume.  ------------------*/

function cube1()
{
    if(variable == 1)
    {
        if(numberOfBlocksAdded == 0)
        {
            PIEchangeDisplayCheckbox("Cube1", true);
            PIEchangeDisplayCheckbox("Cube2", false);
            PIEchangeDisplayCheckbox("Cube3", false);
            PIEchangeDisplayText("Cube Dimension", "2x1x2");
            PIEchangeDisplayText("Sunk", sinking);

            p = 3;

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
        else
        {
            $('input[type="checkbox"]').on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                return false;
                
                alert('Break');
            });
        }
    }
}

function cube2()
{
    if(variable == 1)
    {
        if(numberOfBlocksAdded == 0)
        {
            PIEchangeDisplayCheckbox("Cube1", false);
            PIEchangeDisplayCheckbox("Cube2", true);
            PIEchangeDisplayCheckbox("Cube3", false);
            PIEchangeDisplayText("Cube Dimension", "1.2x0.695x1.2");
            PIEchangeDisplayText("Sunk", sinking);

            p = 3;

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
        else
        {
            $('input[type="checkbox"]').on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                return false;
                
                alert('Break');
            });
        }
    }
}

function cube3()
{
    if(variable == 1)
    {
        if(numberOfBlocksAdded == 0)
        {
            PIEchangeDisplayCheckbox("Cube1", false);
            PIEchangeDisplayCheckbox("Cube2", false);
            PIEchangeDisplayCheckbox("Cube3", true);
            PIEchangeDisplayText("Cube Dimension", "1.4x0.510x1.4");
            PIEchangeDisplayText("Sunk", sinking);
        
            p = 3;

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
        else
        {
            console.log("HELLO from django");
            $('input[type="checkbox"]').on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                return false;
                
                alert('Break');
            });
        }
    }
}

/*----------------------  Function to add cylinder  ------------------*/

function addCylinder()
{
    if(variable == 1)
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
        PIEaddElement(cylinder1)
    }
}

/*----------------------  Function to add Wooden Box  ------------------*/

function addWoodenBox()
{
    if(variable == 1)
    {
        cuboidMaterial = new THREE.MeshBasicMaterial({color: 0x3A281E, side: THREE.DoubleSide, shading: THREE.FlatShading});
        mainCuboid = new THREE.Mesh( new THREE.CubeGeometry( 4 , 1, 4),  cuboidMaterial);
        mainCuboid.position.set(0, 0, 2);
        
        edges = new THREE.EdgesGeometry( new THREE.BoxBufferGeometry( 4, 1, 4 ) );
        mainLine2 = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        mainLine2.position.set(0, 0, 2);

        group.add(mainCuboid);
        group.add(mainLine2);
        group.position.set(0, 3.8, 0);
        PIEaddElement(group);

        primaryBlockType[0] = 1;
    
        ++count1;
    }
}

/*----------------------  Function to calculate how much the block with or without weight has sunk in the water and update the weight  ------------------*/

function sink()
{
    if(variable == 1)
    {
        volume = 0.0016;
        massOfBlock = (densityOfWood*volume);

        massOfBlock += (numberOfBlocks[0]*100)/1000;
        massOfBlock += (numberOfBlocks[1]*200)/1000;
        massOfBlock += (numberOfBlocks[2]*400)/1000;
        massOfBlock += (numberOfBlocks[3]*500)/1000;
        massOfBlock += (numberOfBlocks[4]*1000)/1000;

        heightSinked1 = 3.89 - group.position.y;

        volumeOfWaterDisplaced = massOfBlock/(1000);
        
        heightSinked = volumeOfWaterDisplaced/(volume);

        temp = Math.abs(heightSinked - heightSinked1);
        heightStack.push(temp);
        count = 0;
    }
}

/*----------------------  Function to add table  ------------------*/

function addTable(){
    if(variable == 1) 
    {
        var tableGeom = new THREE.CubeGeometry( 40, 0.5, 40, 4, 4, 1 );
        var tableTop =  new THREE.Mesh( tableGeom,new THREE.MeshBasicMaterial({color: 0x8B4513}));
        tableTop.position.z += 116;
        tableTop.position.y -= 16;
        PIEaddElement(tableTop);

        var edges = new THREE.EdgesGeometry( tableGeom );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        
        tableTop.add(line);

        var tablelegGeom = new THREE.CubeGeometry( 0.5, 40, 0.5, 4, 4, 1 );
        var tableleg =  new THREE.Mesh( tablelegGeom,new THREE.MeshBasicMaterial({color: 0x8B4513}));
        tableleg.position.set(-17.5,-20,17.5);
        
        var edges2 = new THREE.EdgesGeometry( tablelegGeom );
        var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        
        tableleg.add(line2);
        tableTop.add(tableleg);  

       
        var tablelegGeom2 = new THREE.CubeGeometry( 0.5, 40, 0.5, 4, 4, 1 );
        var tableleg2 =  new THREE.Mesh( tablelegGeom2,new THREE.MeshBasicMaterial({color: 0x8B4513}));
        tableleg2.position.set(17.5,-20,17.5);
        
        var edges3 = new THREE.EdgesGeometry( tablelegGeom2 );
        var line3 = new THREE.LineSegments( edges3, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        
        tableleg2.add(line3);
        tableTop.add(tableleg2); 


        var tablelegGeom3 = new THREE.CubeGeometry( 0.5, 40, 0.5, 4, 4, 1 );
        var tableleg3 =  new THREE.Mesh( tablelegGeom3,new THREE.MeshBasicMaterial({color: 0x8B4513}));
        tableleg3.position.set(-17.5,-20,-17.5);
        
        var edges4 = new THREE.EdgesGeometry( tablelegGeom3 );
        var line4 = new THREE.LineSegments( edges4, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        
        tableleg3.add(line4);
        tableTop.add(tableleg3);


        var tablelegGeom4 = new THREE.CubeGeometry( 0.5, 40, 0.5, 4, 4, 1 );
        var tableleg4 =  new THREE.Mesh( tablelegGeom4,new THREE.MeshBasicMaterial({color: 0x8B4513}));
        tableleg4.position.set(17.5,-20,-17.5);
        
        var edges5 = new THREE.EdgesGeometry( tablelegGeom4 );
        var line5 = new THREE.LineSegments( edges5, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        
        tableleg4.add(line5);
        tableTop.add(tableleg4);  
    }  
}

/*----------------------  Function to set variable to detect if start is pressed  ------------------*/

function setVariable()
{
    startanimation;
    variable = 1;
}

/*----------------------  Function to set variable to detect if stop is pressed  ------------------*/

function resetVariable()
{
    variable = 0;
}

function loadExperimentElements()
{
    PIEsetExperimentTitle("Buoyancy");
    PIEsetDeveloperName("Harshit Jain");

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    PIEaddButton("Remove Weight");
    document.getElementById("Remove Weight").addEventListener("click", removeWeight);

    initialiseVariables();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();

    addCylinder();
    addTable();
    addWoodenBox();

    document.getElementById("start").addEventListener('click', setVariable);

    document.getElementById("stop").addEventListener('click', resetVariable);

    PIEsetAreaOfInterest(15, -15, -15, 15);
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
        temp = 0;
        variable = 1;
        cylinder1.scale.y = 1;
        cylinder1.position.y = -1;
        PIEchangeDisplayCheckbox("Cube1", true);
        PIEchangeDisplayCheckbox("Cube2", false);
        PIEchangeDisplayCheckbox("Cube3", false);
    }
    sinking = 0.2;
    PIEchangeDisplayText("Sunk", sinking);
    addWoodenBox();
}

function updateExperimentElements(t, dt)
{
    if(group.position.y <= 3 && group.position.y >= -4.5)
    {
        ++tempvar;
        var current = group.position.y;
        group.position.set(0, current-0.08, 0);
        sinking += 0.09;
        PIEchangeDisplayText("Sunk", sinking);
    }
    else if(temp > 0 && group.position.y > 3)
    {
        if(temp >= 0.08)
        {
            ++count;
            temp -= 0.08;
            group.position.set(0, group.position.y - 0.08, 0);
            sinking += 0.09;
            PIEchangeDisplayText("Sunk", sinking);
            cylinder1.scale.y += 0.005;
            cylinder1.position.y += 2*0.01;
        }
        else
        {
            group.position.set(0, group.position.y - temp, 0);
            cylinder1.scale.y += 0.005;
            cylinder1.position.y += 2*0.01;
            sinking += 0.09;
            PIEchangeDisplayText("Sunk", sinking);
            temp = 0;
        }
    }
    else if(temp < 0 && group.position.y > 3)
    {
        if(temp <= -0.08)
        {
            temp += 0.08;
            group.position.set(0, group.position.y + 0.08, 0);
            sinking -= 0.09;
            PIEchangeDisplayText("Sunk", sinking);
            cylinder1.scale.y -= 0.005;
            cylinder1.position.y -= 2*0.01;
        }
        else
        {
            group.position.set(0, group.position.y - temp, 0);
            temp = 0;
            sinking -= 0.09;
            PIEchangeDisplayText("Sunk", sinking);
            cylinder1.scale.y -= 0.005;
            cylinder1.position.y -= 2*0.01;
        }
    }
}