import React from 'react'
import { Graph } from 'react-d3-graph';

function GodGraphComponent(props) {

    const me = [{id: props.nodes.name.toUpperCase(), 
        svg: require(`./images/${props.nodes.name.toLowerCase()}.jpg`), fontColor: 'red', size: 800 }]

    const mom = [{id: props.nodes.mother, size: 200, 
        svg: require(`./images/${props.nodes.mother.toLowerCase()}.jpg`), fontColor: 'blue' }]

    const dad = [{id: props.nodes.father, size: 200, 
        svg: require(`./images/${props.nodes.father.toLowerCase()}.jpg`), fontColor: 'blue' }]

    const siblings = props.nodes.siblings.map(sibling => {
	   return {id: sibling, size: 200, svg: require(`./images/${sibling.toLowerCase()}.jpg`), fontColor: 'blue' } } ) 

    const kids = props.nodes.children.map(child => {
	   return {id: child, size: 200, svg: require(`./images/${child.toLowerCase()}.jpg`), fontColor: 'blue' } } ) 

    const theFolks = { id: 'Parents', symbolType: "diamond", fontColor: 'green', collapsable: true }
        const theKids = { id: 'Children', symbolType: "diamond", fontColor: 'green'}
            const theSibs = { id: 'Siblings', symbolType: "diamond", fontColor: 'green'}

const theTree = [{ source: me[0].id, target: theSibs.id }, 
    {source: me[0].id, target: theFolks.id}, {source: me[0].id, target: theKids.id}]

const sibTree = siblings.map(sibling => {
	return {source: 'Siblings', target: sibling.id}  
})

const kidTree = kids.map(child => {
	return {source: 'Children', target: child.id}  
})

const momDadTree = [ {source: 'Parents', target: mom[0].id}, {source: 'Parents', target: dad[0].id}]

const allLinks = theTree.concat(sibTree, kidTree, momDadTree )
const allNodes = me.concat(siblings, mom, dad, kids, theFolks, theKids, theSibs)

// graph payload (with minimalist structure)
const data = {
    nodes: allNodes,
    links: allLinks,
    collapsable: true
};
 
// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    height: 700,
    width: 700,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    highlightOpacity: .2,
    linkStrength: 4,
    minZoom: .7,
    d3: {
        gravity: -350,
        linkLength: 120
    },
    node: {
        fontColor: 'red',
        color: '#2175d8',
        size: 80,
        highlightStrokeColor: '#e34234'
    },
    link: {
        highlightColor: '#e34234'
    },
    collapsible: true,
    directed: true
};
 
// graph event callbacks
const onClickGraph = function() {
    // window.alert(`Clicked the graph background`);
};
 
const onClickNode = function(nodeId) {
    // window.alert(`Clicked node ${nodeId}`);
};
 
const onDoubleClickNode = function(nodeId) {
    // window.alert(`Double clicked node ${nodeId}`);
};
 
const onRightClickNode = function(event, nodeId) {
    // window.alert(`Right clicked node ${nodeId}`);
};
 
const onMouseOverNode = function(nodeId) {
    // window.alert(`Mouse over node ${nodeId}`);
};
 
const onMouseOutNode = function(nodeId) {
    // window.alert(`Mouse out node ${nodeId}`);
};
 
const onClickLink = function(source, target) {
    // window.alert(`Clicked link between ${source} and ${target}`);
};
 
const onRightClickLink = function(event, source, target) {
    // window.alert(`Right clicked link between ${source} and ${target}`);
};
 
const onMouseOverLink = function(source, target) {
    // window.alert(`Mouse over in link between ${source} and ${target}`);
};
 
const onMouseOutLink = function(source, target) {
    // window.alert(`Mouse out link between ${source} and ${target}`);
};

return( 
<div className="kewlGraph">
{props.nodes ? 
	<Graph
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={data}
    config={myConfig}
    onClickNode={onClickNode}
    onRightClickNode={onRightClickNode}
    onClickGraph={onClickGraph}
    onClickLink={onClickLink}
    onRightClickLink={onRightClickLink}
    onMouseOverNode={onMouseOverNode}
    onMouseOutNode={onMouseOutNode}
    onMouseOverLink={onMouseOverLink}
    onMouseOutLink={onMouseOutLink}
	/> : null}
	</div>
		)
	}

export default GodGraphComponent