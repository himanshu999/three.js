import { UIPanel } from './libs/ui.js';

import { SidebarMaterial } from './Sidebar.Material.js';
//import {SidebarMaterialList} from './Sidebar.MaterialList.js';

function SidebarProperties( editor ) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'properties' );

	container.add(new SidebarMaterial( editor ));
	//container.add(new SidebarMaterialList(editor));

	return container;
	
	//return new SidebarMaterial( editor );

}

export { SidebarProperties };
