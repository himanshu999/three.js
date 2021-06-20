import { UIElement, UIButton, UICheckbox, UIColor, UIInput, UINumber, UIPanel, UIRow, UISelect, UIText, UITextArea } from './libs/ui.js';


function SidebarMaterialList(editor){
  
  var container = new UIPanel();
  container.setId('materiallist');
  container.setBorderTop( '0' );
  container.setPaddingTop( '4px' );
  
  container.add(new UIText('Material Library').addClass('sidebarh1'));
	
	container.add(new UIText('Leather').addClass('sidebarh2'));
  
  var materialListRow = new UIRow();
  materialListRow.add(createMaterialView());
  
  container.add(materialListRow);
  
  /*var createHotspotButton = new UIButton('Add Hotspots').addClass('primary').onClick(() => {
          
	  if(editor.hotspotPoints.length === 0)
	  alert('Click on the point where you want to place the annotation');
	  
	  editor.isSettingHotspot = true;		
	  container.add(createHotspotDetailUI());
	  
	  
  });
	
  hotspotButtonRow.add(createHotspotButton);
  container.add(hotspotButtonRow);*/
  
  
  function createMaterialView(){
  
     
    var template = document.createElement('template');
    template.innerHTML = '<div class="mat-thumb" style="background:red"><span class="mat-name">Testing</span></div>';
    
    let materialView = new UIElement(template.content.firstChild);  
	 
    return materialView;
  
  } 	
	
  
	
  
  
  return container;

}

export { SidebarMaterialList };
