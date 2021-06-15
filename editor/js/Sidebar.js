import { UITabbedPanel, UISpan } from './libs/ui.js';

import { SidebarProperties } from './Sidebar.Properties.js';


function Sidebar( editor ) {

	var strings = editor.strings;

	var container = new UITabbedPanel();
	container.setId( 'sidebar' );

	var scene = new UISpan().add(new SidebarProperties( editor ));
	

	container.addTab( 'scene', strings.getKey( 'sidebar/scene' ), scene );
	
	container.select( 'scene' );

	return container;

}

export { Sidebar };
