import { UIPanel, UISpan } from './libs/ui.js';

import { SidebarScene } from './Sidebar.Scene.js';
import { SidebarProperties } from './Sidebar.Properties.js';
import { SidebarProject } from './Sidebar.Project.js';
import { SidebarSettings } from './Sidebar.Settings.js';

function Sidebar( editor ) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'sidebar' );

	var scene = new UISpan().add(
		/*new SidebarScene( editor ),*/
		new SidebarProperties( editor ),
		
		
	);
	
	var project = new SidebarProject( editor );
	var settings = new SidebarSettings( editor );
	
	container.add(scene);
	

	/*container.addTab( 'scene', strings.getKey( 'sidebar/scene' ), scene );
	//container.addTab( 'project', strings.getKey( 'sidebar/project' ), project );
	//container.addTab( 'settings', strings.getKey( 'sidebar/settings' ), settings );
	container.select( 'scene' );*/
	
	

	return container;


}

export { Sidebar };
