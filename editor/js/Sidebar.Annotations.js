import * as THREE from '../../build/three.module.js';

import { UIButton, UICheckbox, UIColor, UIInput, UINumber, UIPanel, UIRow, UISelect, UIText, UITextArea } from './libs/ui.js';


function SidebarAnnotations(editor){
  
  var container = new UIPanel();
  container.setId('annotations');
  container.setBorderTop( '0' );
  container.setPaddingTop( '4px' );
  
  container.add(new UIText('Annotations').addClass('sidebarh1'));
	
	  
  var hotspotButtonRow = new UIRow();
  
  var createHotspotButton = new UIButton('Add Hotspots').onClick(() => {
  	container.add(createHotspotDetailUI());
  });
	
  hotspotButtonRow.add(createHotspotButton);
  container.add(hotspotButtonRow);
  
  
  function createHotspotDetailUI(){
  
  	  var hostspotDetailsContainer = new UIPanel().addClass('hotspot-detail');
  	
	
	  var hospotNumberRow = new UIRow();
	  hospotNumberRow.add( new UIText( 'Number' ).setWidth( '90px' ) );

	  var numberInput = new UIInput().onChange(() => {

	  });
	  hospotNumberRow.add(numberInput);
	  hostspotDetailsContainer.add(hospotNumberRow);


	  var hotspotDescRow = new UIRow();
	  var hotspotDescInput = new UITextArea().setWidth('100%').setHeight('5rem').setValue('Type a description here...').onChange(() => {

	  });
	  hotspotDescRow.add(hotspotDescInput);
	  hostspotDetailsContainer.add(hotspotDescRow);
  
	  return hostspotDetailsContainer;
  
  } 	
	
  
	
  
  
  return container;

}

export { SidebarAnnotations };
