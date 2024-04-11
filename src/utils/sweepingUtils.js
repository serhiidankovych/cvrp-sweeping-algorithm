import { nodesCoordinates, baseNode, Dmax } from "../data/data";

function calculateRelativeCoordinates(x, y, node) {
  return {
    x: x - baseNode.x,
    y: y - baseNode.y,
    node: node,
  };
}
function getEuclideanDistance(nodeA, nodeB) {
  const nodeACoordinates = nodesCoordinates.find((node) => node.node === nodeA);
  const nodeBCoordinates = nodesCoordinates.find((node) => node.node === nodeB);

  const deltaX = nodeACoordinates.x - nodeBCoordinates.x;
  const deltaY = nodeACoordinates.y - nodeBCoordinates.y;

  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}
// function checkPolarRadius(nodeA, nodeB) {
//   const polarNodeA = getEuclideanDistance(nodeA);
//   const polarNodeB = getEuclideanDistance(nodeB);
//   return polarNodeA > polarNodeB ? polarNodeA : polarNodeB;
// }

function checkQuadrant(x, y) {
  if (x > 0 && y > 0) {
    return 0; // Quadrant I
  } else if (x < 0 && y > 0) {
    return 90; // Quadrant II
  } else if (x < 0 && y < 0) {
    return 180; // Quadrant III
  } else if (x > 0 && y < 0) {
    return 270; // Quadrant IV
  } else if (x === 0 && y !== 0) {
    return 0; // On the y-axis
  } else if (x !== 0 && y === 0) {
    return 0; // On the x-axis
  } else {
    return 0; // At the origin
  }
}

function getAngleForQuadrant(x, y, quadrant) {
  const angle = (Math.abs(Math.atan(y / x)) * 180) / Math.PI;
  return angle + quadrant;
}

function getNodesAngles() {
  const nodesAngles = nodesCoordinates
    .map((nodeInfo) => {
      const { x, y, node } = nodeInfo;
      console.log(calculateRelativeCoordinates(x, y, node));
      return calculateRelativeCoordinates(x, y, node);
    })
    .map((nodeRealtive) => {
      const { x, y, node } = nodeRealtive;
      const quadrant = checkQuadrant(x, y);

      console.log(node + ": " + quadrant);
      return {
        node,
        angle: getAngleForQuadrant(x, y, quadrant),
      };
    });
  console.log(nodesAngles);
  return nodesAngles;
}

function sortByNodesAngles(a, b) {
  return a.angle - b.angle;
}

const nodesAngles = getNodesAngles();
export const sweepingList = nodesAngles.sort(sortByNodesAngles);
console.log(sweepingList);

function findRoutes(savings) {
  const routes = [];
  let currentRoute = [];
  let currentLoad = 0;

  for (const saving of savings) {
    const nodeBInfo = nodesCoordinates.find(
      (node) => node.node === saving.node
    );
    if (currentLoad + nodeBInfo.demand <= Dmax) {
      currentRoute.push(saving);
      currentLoad += nodeBInfo.demand;
      console.log(currentLoad);
    } else {
      routes.push(currentRoute);
      currentRoute = [saving];
      currentLoad = nodeBInfo.demand;
    }
  }

  if (currentRoute.length > 0) {
    routes.push(currentRoute);
  }

  return routes;
}

// Find routes
const routes = findRoutes(sweepingList);
console.log(routes);

function routesToChartFormat(routes) {
  const routesFormated = [];

  routes.forEach((routeNodes, index) => {
    const nodes = [0, ...routeNodes.map((node) => node.node), 0];
    routesFormated.push({
      routeIndex: index,
      nodes: nodes,
    });
  });

  return routesFormated;
}

export const routesFormated = routesToChartFormat(routes);
console.log(routesFormated);

//Function to calculate route length
function calculateRouteLength(route) {
  let length = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const currentNode = route[i];
    const nextNode = route[i + 1];
    const distance = getEuclideanDistance(currentNode, nextNode);
    length += distance;
  }
  return length;
}
export const routesLength = [];
// Calculate and print route lengths
routesFormated.forEach((route) => {
  const routeLength = calculateRouteLength(route.nodes);
  routesLength.push({ routeIndex: route.routeIndex, length: routeLength });
});

console.log(routesLength);

// Function to calculate the total length of all routes
function calculateTotalLength(routesLength) {
  let totalLength = 0;
  routesLength.forEach((route) => {
    totalLength += route.length;
  });
  return totalLength;
}
// Calculate the total length of all routes
export const totalLength = calculateTotalLength(routesLength);
console.log(`Total length of all routes: ${totalLength}`);
