import { UITabbedPanel } from './libs/ui.js';

import { SidebarMaterial } from './Sidebar.Material.js';

function SidebarProperties( editor ) {

	var strings = editor.strings;

	/*var container = new UITabbedPanel();
	container.setId( 'properties' );

	container.addTab( 'material', strings.getKey( 'sidebar/properties/material' ), new SidebarMaterial( editor ) );
	container.select( 'material' );

	return container;*/
	
	return new SidebarMaterial( editor );

}

export { SidebarProperties };
