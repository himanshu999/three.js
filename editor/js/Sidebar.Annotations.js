import * as THREE from '../../build/three.module.js';

import { UIButton, UICheckbox, UIColor, UIInput, UINumber, UIPanel, UIRow, UISelect, UIText, UITextArea } from './libs/ui.js';


function SidebarAnnotations(){
  
  var container = new UIPanel();
  container.setId('annotations');
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
  
  var hospotButtonRow = new UIRow();
  var createHotspotButton = new UIButton('Add Hostspots').onClick(() => {
  
  });
  hotspotsButtonRow.add(createHotspotButton);
  container.add(hotspotButtonRow);
  
  
  var hospotNumberRow = new UIRow();
  var numberInput = new UIInput().setType('number').onChange(() => {
  
  });
  hospotNumberRow.add(numberInput);
  container.add(hospotNumberRow);
  
  
  var hotspotDescRow = new UIRow();
  var hotspotDescInput = new UITextArea().setWidth('100%').setHeight('5rem').onChange(() => {
  
  });
  hotspotDescRow.add(hotspotDescInput);
  container.add(hotspotDescRow);
  
  
  return container;

}

export { SidebarAnnotations };
