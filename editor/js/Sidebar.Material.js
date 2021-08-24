import * as THREE from '../../build/three.module.js';

import { UIButton, UICheckbox, UIColor, UIInput, UINumber, UIPanel, UIRow, UISelect, UIText } from './libs/ui.js';
import { UITexture } from './libs/ui.three.js';

import { SetMaterialCommand } from './commands/SetMaterialCommand.js';
import { SetMaterialColorCommand } from './commands/SetMaterialColorCommand.js';
import { SetMaterialMapCommand } from './commands/SetMaterialMapCommand.js';
import { SetMaterialValueCommand } from './commands/SetMaterialValueCommand.js';
import { SetMaterialVectorCommand } from './commands/SetMaterialVectorCommand.js';

var materialClasses = {
	'LineBasicMaterial': THREE.LineBasicMaterial,
	'LineDashedMaterial': THREE.LineDashedMaterial,
	'MeshBasicMaterial': THREE.MeshBasicMaterial,
	'MeshDepthMaterial': THREE.MeshDepthMaterial,
	'MeshNormalMaterial': THREE.MeshNormalMaterial,
	'MeshLambertMaterial': THREE.MeshLambertMaterial,
	'MeshMatcapMaterial': THREE.MeshMatcapMaterial,
	'MeshPhongMaterial': THREE.MeshPhongMaterial,
	'MeshToonMaterial': THREE.MeshToonMaterial,
	'MeshStandardMaterial': THREE.MeshStandardMaterial,
	'MeshPhysicalMaterial': THREE.MeshPhysicalMaterial,
	'RawShaderMaterial': THREE.RawShaderMaterial,
	'ShaderMaterial': THREE.ShaderMaterial,
	'ShadowMaterial': THREE.ShadowMaterial,
	'SpriteMaterial': THREE.SpriteMaterial,
	'PointsMaterial': THREE.PointsMaterial
};

var repeatX = 14;

function SidebarMaterial( editor ) {

	var strings = editor.strings;

	var signals = editor.signals;

	var currentObject;

	var currentMaterialSlot = 0;
	
	var currentMaterialName, currentMaterialCategory;

	var epsilon = 0.01 - Number.EPSILON;

	var container = new UIPanel();
	container.setBorderTop( '0' );
	container.setDisplay( 'none' );
	container.setPaddingTop( '20px' );
	
	container.add(new UIText('Material Settings').addClass('sidebarh1').setWidth('100% !important').setFontSize('1rem'));

	// Current material slot

	var materialSlotRow = new UIRow();

	materialSlotRow.add( new UIText( strings.getKey( 'sidebar/material/slot' ) ).setWidth( '90px' ) );

	var materialSlotSelect = new UISelect().setWidth( '170px' ).setFontSize( '12px' ).onChange( update );
	materialSlotSelect.setOptions( { 0: '' } ).setValue( 0 );
	materialSlotRow.add( materialSlotSelect );

	container.add( materialSlotRow);
	
	// type

	/*var materialClassRow = new UIRow();
	var materialClass = new UISelect().setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

	materialClassRow.add( new UIText( strings.getKey( 'sidebar/material/type' ) ).setWidth( '90px' ) );
	materialClassRow.add( materialClass );

	container.add( materialClassRow );
	
	// uuid

	var materialUUIDRow = new UIRow();
	var materialUUID = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
	var materialUUIDRenew = new UIButton( strings.getKey( 'sidebar/material/new' ) ).setMarginLeft( '7px' ).onClick( function () {

		materialUUID.setValue( THREE.MathUtils.generateUUID() );
		update();

	} ); 

	materialUUIDRow.add( new UIText( strings.getKey( 'sidebar/material/uuid' ) ).setWidth( '90px' ) );
	materialUUIDRow.add( materialUUID );
	materialUUIDRow.add( materialUUIDRenew );

	container.add( materialUUIDRow );*/
	
	var materialCategoryRow = new UIRow();
	var materialCategory = new UISelect().setWidth( '100px' ).onChange( () => {} );
	let options = {};
	var matCategorised  = editor.matCategorised;
	for(const key in matCategorised){
	  options[key] = key;
	}
	materialCategory.setOptions(options).setValue(Object.keys(matCategorised)[0]);
	
	materialCategoryRow.add( new UIText('Category') );
	materialCategoryRow.add( materialCategory );

	container.add( materialCategoryRow );
	
	
	var materialNameRow = new UIRow();
	var materialName = new UIInput().setWidth( '100px' ).setValue('Material Name').onChange( () => {} );

	materialNameRow.add( new UIText('Name') );
	materialNameRow.add( materialName );

	container.add( materialNameRow );
	
	
	


	// color

	var materialColorRow = new UIRow();
	var materialColor = new UIColor().onInput( update );

	materialColorRow.add( new UIText( strings.getKey( 'sidebar/material/color' ) ).setWidth( '90px' ) );
	materialColorRow.add( materialColor );

	container.add( materialColorRow );

	// roughness

	var materialRoughnessRow = new UIRow();
	var materialRoughness = new UINumber( 0.5 ).setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

	materialRoughnessRow.add( new UIText( strings.getKey( 'sidebar/material/roughness' ) ).setWidth( '90px' ) );
	materialRoughnessRow.add( materialRoughness );

	container.add( materialRoughnessRow );

	// metalness

	var materialMetalnessRow = new UIRow();
	var materialMetalness = new UINumber( 0.5 ).setWidth( '60px' ).setRange( 0, 1 ).onChange( update );

	materialMetalnessRow.add( new UIText( strings.getKey( 'sidebar/material/metalness' ) ).setWidth( '90px' ) );
	materialMetalnessRow.add( materialMetalness );

	container.add( materialMetalnessRow );


	// emissive

	var materialEmissiveRow = new UIRow();
	var materialEmissive = new UIColor().setHexValue( 0x000000 ).onInput( update );
	var materialEmissiveIntensity = new UINumber( 1 ).setWidth( '30px' ).onChange( update );

	materialEmissiveRow.add( new UIText( strings.getKey( 'sidebar/material/emissive' ) ).setWidth( '90px' ) );
	materialEmissiveRow.add( materialEmissive );
	materialEmissiveRow.add( materialEmissiveIntensity );

	container.add( materialEmissiveRow );


	
	// map

	var materialMapRow = new UIRow();
	var materialMapEnabled = new UICheckbox( false ).onChange( update );
	var materialMap = new UITexture().onChange( updateMaterial );
	var materialMapRepeatNum = new UINumber( repeatX ).setWidth( '30px' ).onChange( update );

	materialMapRow.add( new UIText( strings.getKey( 'sidebar/material/map' ) ).setWidth( '90px' ) );
	materialMapRow.add( materialMapEnabled );
	materialMapRow.add( materialMap );
	materialMapRow.add( materialMapRepeatNum );

	container.add( materialMapRow );


	// normal map

	var materialNormalMapRow = new UIRow();
	var materialNormalMapEnabled = new UICheckbox( false ).onChange( update );
	var materialNormalMap = new UITexture().onChange( update );
	var materialNormalScaleX = new UINumber( 1 ).setWidth( '30px' ).onChange( update );
	var materialNormalScaleY = new UINumber( 1 ).setWidth( '30px' ).onChange( update );

	materialNormalMapRow.add( new UIText( strings.getKey( 'sidebar/material/normalmap' ) ).setWidth( '90px' ) );
	materialNormalMapRow.add( materialNormalMapEnabled );
	materialNormalMapRow.add( materialNormalMap );
	materialNormalMapRow.add( materialNormalScaleX );
	materialNormalMapRow.add( materialNormalScaleY );

	container.add( materialNormalMapRow );

	// roughness map

	var materialRoughnessMapRow = new UIRow();
	var materialRoughnessMapEnabled = new UICheckbox( false ).onChange( update );
	var materialRoughnessMap = new UITexture().onChange( update );

	materialRoughnessMapRow.add( new UIText( strings.getKey( 'sidebar/material/roughmap' ) ).setWidth( '90px' ) );
	materialRoughnessMapRow.add( materialRoughnessMapEnabled );
	materialRoughnessMapRow.add( materialRoughnessMap );

	container.add( materialRoughnessMapRow );

	// metalness map

	var materialMetalnessMapRow = new UIRow();
	var materialMetalnessMapEnabled = new UICheckbox( false ).onChange( update );
	var materialMetalnessMap = new UITexture().onChange( update );

	materialMetalnessMapRow.add( new UIText( strings.getKey( 'sidebar/material/metalmap' ) ).setWidth( '90px' ) );
	materialMetalnessMapRow.add( materialMetalnessMapEnabled );
	materialMetalnessMapRow.add( materialMetalnessMap );

	container.add( materialMetalnessMapRow );

	
	// ambient occlusion map

	var materialAOMapRow = new UIRow();
	var materialAOMapEnabled = new UICheckbox( false ).onChange( update );
	var materialAOMap = new UITexture().onChange( update );
	var materialAOScale = new UINumber( 1 ).setRange( 0, 1 ).setWidth( '30px' ).onChange( update );

	materialAOMapRow.add( new UIText( strings.getKey( 'sidebar/material/aomap' ) ).setWidth( '90px' ) );
	materialAOMapRow.add( materialAOMapEnabled );
	materialAOMapRow.add( materialAOMap );
	materialAOMapRow.add( materialAOScale );

	container.add( materialAOMapRow );
	
	
	var saveMaterialButtonRow = new UIRow();
  
  	var saveMaterialButton = new UIButton('Save Material').setId('savematbtn').addClass('primary').onClick(() => {
		
		 let material = editor.getObjectMaterial( currentObject, currentMaterialSlot );
		 console.log(material.toJSON());
		
		 let currentMaterialCategory = materialCategory.getValue();
		 let currentMaterialName = materialName.getValue();
		
		 console.log(currentMaterialName);
		
		 
		
		 let materialJSON = material.toJSON();
		
		
		 window.saveMaterial({name: currentMaterialName, category: currentMaterialCategory , materialJSON});
		
		/* matCategorised[currentMaterialCategory].some((mat, index) => {
		 	if(mat.name === currentMaterialName){
				matCategorised[currentMaterialCategory][index] = {...material.toJSON(), name: currentMaterialName};
				return true;
			}else if(index === matCategorised[currentMaterialCategory].length - 1){
				
				matCategorised[currentMaterialCategory].push({...material.toJSON(), name: currentMaterialName});
				return true;
			}	
				
		 });  */
		
	        
	         //signals.materialListChanged.dispatch();
		
		
	});
	
	saveMaterialButtonRow.add(saveMaterialButton);
	container.add(saveMaterialButtonRow);
	
	

	
	function update() {

		var object = currentObject;

		var geometry = object.geometry;

		var previousSelectedSlot = currentMaterialSlot;

		currentMaterialSlot = parseInt( materialSlotSelect.getValue() );

		if ( currentMaterialSlot !== previousSelectedSlot ) refreshUI( true );

		var material = editor.getObjectMaterial( currentObject, currentMaterialSlot );

		var textureWarning = false;
		var objectHasUvs = false;

		if ( object.isSprite ) objectHasUvs = true;
		if ( geometry.isGeometry && geometry.faceVertexUvs[ 0 ].length > 0 ) objectHasUvs = true;
		if ( geometry.isBufferGeometry && geometry.attributes.uv !== undefined ) objectHasUvs = true;

		if ( material ) {

			/*if ( material.uuid !== undefined && material.uuid !== materialUUID.getValue() ) {

				editor.execute( new SetMaterialValueCommand( editor, currentObject, 'uuid', materialUUID.getValue(), currentMaterialSlot ) );

			}

			if ( material.type !== materialClass.getValue() ) {

				material = new materialClasses[ materialClass.getValue() ]();

				if ( material.type === 'RawShaderMaterial' ) {

					material.vertexShader = vertexShaderVariables + material.vertexShader;

				}

				if ( Array.isArray( currentObject.material ) ) {

					// don't remove the entire multi-material. just the material of the selected slot

					editor.removeMaterial( currentObject.material[ currentMaterialSlot ] );

				} else {

					editor.removeMaterial( currentObject.material );

				}

				editor.execute( new SetMaterialCommand( editor, currentObject, material, currentMaterialSlot ), 'New Material: ' + materialClass.getValue() );
				editor.addMaterial( material );
				// TODO Copy other references in the scene graph
				// keeping name and UUID then.
				// Also there should be means to create a unique
				// copy for the current object explicitly and to
				// attach the current material to other objects.

			}*/

			if ( material.color !== undefined && material.color.getHex() !== materialColor.getHexValue() ) {

				editor.execute( new SetMaterialColorCommand( editor, currentObject, 'color', materialColor.getHexValue(), currentMaterialSlot ) );

			}

			if ( material.roughness !== undefined && Math.abs( material.roughness - materialRoughness.getValue() ) >= epsilon ) {

				editor.execute( new SetMaterialValueCommand( editor, currentObject, 'roughness', materialRoughness.getValue(), currentMaterialSlot ) );

			}

			if ( material.metalness !== undefined && Math.abs( material.metalness - materialMetalness.getValue() ) >= epsilon ) {

				editor.execute( new SetMaterialValueCommand( editor, currentObject, 'metalness', materialMetalness.getValue(), currentMaterialSlot ) );

			}

			

			if ( material.emissive !== undefined && material.emissive.getHex() !== materialEmissive.getHexValue() ) {

				editor.execute( new SetMaterialColorCommand( editor, currentObject, 'emissive', materialEmissive.getHexValue(), currentMaterialSlot ) );

			}

			if ( material.emissiveIntensity !== undefined && material.emissiveIntensity !== materialEmissiveIntensity.getValue() ) {

				editor.execute( new SetMaterialValueCommand( editor, currentObject, 'emissiveIntensity', materialEmissiveIntensity.getValue(), currentMaterialSlot ) );

			}


			if ( material.depthPacking !== undefined ) {

				var depthPacking = parseInt( materialDepthPacking.getValue() );
				if ( material.depthPacking !== depthPacking ) {

					editor.execute( new SetMaterialValueCommand( editor, currentObject, 'depthPacking', depthPacking, currentMaterialSlot ) );

				}

			}

			if ( material.map !== undefined ) {

				var mapEnabled = materialMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					var map = mapEnabled ? materialMap.getValue() : null;
					
					if(mapEnabled){
							map.wrapS = THREE.RepeatWrapping;
							map.wrapT = THREE.RepeatWrapping;
							repeatX = materialMapRepeatNum.getValue();
							map.repeat.set( repeatX, repeatX );
					}
					
					if ( material.map !== map ) {
						
						
						

						editor.execute( new SetMaterialMapCommand( editor, currentObject, 'map', map, currentMaterialSlot ) );

					}

				} else {

					if ( mapEnabled ) textureWarning = true;

				}

			}


			if ( material.normalMap !== undefined ) {

				var normalMapEnabled = materialNormalMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					var normalMap = normalMapEnabled ? materialNormalMap.getValue() : null;
					if ( material.normalMap !== normalMap ) {
						
						if(normalMapEnabled){
							normalMap.wrapS = THREE.RepeatWrapping;
							normalMap.wrapT = THREE.RepeatWrapping;
							normalMap.repeat.set( repeatX, repeatX );
						}	

						editor.execute( new SetMaterialMapCommand( editor, currentObject, 'normalMap', normalMap, currentMaterialSlot ) );

					}

					if ( material.normalScale.x !== materialNormalScaleX.getValue() ||
						material.normalScale.y !== materialNormalScaleY.getValue() ) {

						var value = [
							materialNormalScaleX.getValue(),
							materialNormalScaleY.getValue()
						];
						editor.execute( new SetMaterialVectorCommand( editor, currentObject, 'normalScale', value, currentMaterialSlot ) );

					}

				} else {

					if ( normalMapEnabled ) textureWarning = true;

				}

			}


			if ( material.reflectivity !== undefined ) {

				var reflectivity = materialReflectivity.getValue();

				if ( material.reflectivity !== reflectivity ) {

					editor.execute( new SetMaterialValueCommand( editor, currentObject, 'reflectivity', reflectivity, currentMaterialSlot ) );

				}

			}


			if ( material.aoMap !== undefined ) {

				var aoMapEnabled = materialAOMapEnabled.getValue() === true;

				if ( objectHasUvs ) {

					var aoMap = aoMapEnabled ? materialAOMap.getValue() : null;
					if ( material.aoMap !== aoMap ) {
						
						aoMap.wrapS = THREE.RepeatWrapping;
						aoMap.wrapT = THREE.RepeatWrapping;
						aoMap.repeat.set( repeatX, repeatX );

						editor.execute( new SetMaterialMapCommand( editor, currentObject, 'aoMap', aoMap, currentMaterialSlot ) );

					}

					if ( material.aoMapIntensity !== materialAOScale.getValue() ) {

						editor.execute( new SetMaterialValueCommand( editor, currentObject, 'aoMapIntensity', materialAOScale.getValue(), currentMaterialSlot ) );

					}

				} else {

					if ( aoMapEnabled ) textureWarning = true;

				}

			}





			refreshUI();

		}

		if ( textureWarning ) {

			console.warn( 'Can\'t set texture, model doesn\'t have texture coordinates' );

		}

	}

	function updateMaterial( texture ) {

		if ( texture !== null ) {

			if ( texture.isDataTexture !== true && texture.encoding !== THREE.sRGBEncoding ) {

				texture.encoding = THREE.sRGBEncoding;
				var object = currentObject;
				if ( object !== null ) {

					object.material.needsUpdate = true;

				}

			}

		}

		update();

	}

	//

	function setRowVisibility() {

		var properties = {
			'color': materialColorRow,
			'roughness': materialRoughnessRow,
			'metalness': materialMetalnessRow,
			'emissive': materialEmissiveRow,
			'map': materialMapRow,
			'normalMap': materialNormalMapRow,
			'roughnessMap': materialRoughnessMapRow,
			'metalnessMap': materialMetalnessMapRow,
			'aoMap': materialAOMapRow,
		};

		var material = currentObject.material;

		if ( Array.isArray( material ) ) {

			materialSlotRow.setDisplay( '' );

			if ( material.length === 0 ) return;

			material = material[ currentMaterialSlot ];

		} else {

			materialSlotRow.setDisplay( 'none' );

		}

		for ( var property in properties ) {

			properties[ property ].setDisplay( material[ property ] !== undefined ? '' : 'none' );

		}

	}


	function refreshUI( resetTextureSelectors ) {

		if ( ! currentObject ) return;

		var material = currentObject.material;

		if ( Array.isArray( material ) ) {

			var slotOptions = {};

			currentMaterialSlot = Math.max( 0, Math.min( material.length, currentMaterialSlot ) );

			for ( var i = 0; i < material.length; i ++ ) {

				slotOptions[ i ] = String( i + 1 ) + ': ' + material[ i ].name;

			}

			materialSlotSelect.setOptions( slotOptions ).setValue( currentMaterialSlot );

		}

		material = editor.getObjectMaterial( currentObject, currentMaterialSlot );

		/*if ( material.uuid !== undefined ) {

			materialUUID.setValue( material.uuid );

		}*/

		

		if ( currentObject.isMesh ) {

			//materialClass.setOptions( meshMaterialOptions );

		} else if ( currentObject.isSprite ) {

			//materialClass.setOptions( spriteMaterialOptions );

		} else if ( currentObject.isPoints ) {

			//materialClass.setOptions( pointsMaterialOptions );

		} else if ( currentObject.isLine ) {

			//materialClass.setOptions( lineMaterialOptions );

		}

		//materialClass.setValue( material.type );


		if ( material.color !== undefined ) {

			materialColor.setHexValue( material.color.getHexString() );

		}

		if ( material.roughness !== undefined ) {

			materialRoughness.setValue( material.roughness );

		}

		if ( material.metalness !== undefined ) {

			materialMetalness.setValue( material.metalness );

		}

		

		if ( material.emissive !== undefined ) {

			materialEmissive.setHexValue( material.emissive.getHexString() );

			materialEmissiveIntensity.setValue( material.emissiveIntensity );

		}


		if ( material.map !== undefined ) {

			materialMapEnabled.setValue( material.map !== null );

			if ( material.map !== null || resetTextureSelectors ) {

				materialMap.setValue( material.map );

			}

		}

		

		if ( material.normalMap !== undefined ) {

			materialNormalMapEnabled.setValue( material.normalMap !== null );

			if ( material.normalMap !== null || resetTextureSelectors ) {

				materialNormalMap.setValue( material.normalMap );

			}

			materialNormalScaleX.setValue( material.normalScale.x );
			materialNormalScaleY.setValue( material.normalScale.y );

		}


		if ( material.roughnessMap !== undefined ) {

			materialRoughnessMapEnabled.setValue( material.roughnessMap !== null );

			if ( material.roughnessMap !== null || resetTextureSelectors ) {

				materialRoughnessMap.setValue( material.roughnessMap );

			}

		}

		if ( material.metalnessMap !== undefined ) {

			materialMetalnessMapEnabled.setValue( material.metalnessMap !== null );

			if ( material.metalnessMap !== null || resetTextureSelectors ) {

				materialMetalnessMap.setValue( material.metalnessMap );

			}

		}


		


		if ( material.aoMap !== undefined ) {

			materialAOMapEnabled.setValue( material.aoMap !== null );

			if ( material.aoMap !== null || resetTextureSelectors ) {

				materialAOMap.setValue( material.aoMap );

			}

			materialAOScale.setValue( material.aoMapIntensity );

		}

	

		setRowVisibility();

	}

	// events

	signals.objectSelected.add( function ( object ) {

		var hasMaterial = false;

		if ( object && object.material ) {

			hasMaterial = true;

			if ( Array.isArray( object.material ) && object.material.length === 0 ) {

				hasMaterial = false;

			}

		}

		if ( hasMaterial ) {

			var objectChanged = object !== currentObject;

			currentObject = object;
			refreshUI( objectChanged );
			container.setDisplay( '' );

		} else {

			currentObject = null;
			container.setDisplay( 'none' );

		}

	} );

	signals.materialChanged.add( function () {

		refreshUI();

	} );

	var vertexShaderVariables = [
		'uniform mat4 projectionMatrix;',
		'uniform mat4 modelViewMatrix;\n',
		'attribute vec3 position;\n\n',
	].join( '\n' );

	var meshMaterialOptions = {
		'MeshBasicMaterial': 'MeshBasicMaterial',
		'MeshDepthMaterial': 'MeshDepthMaterial',
		'MeshNormalMaterial': 'MeshNormalMaterial',
		'MeshLambertMaterial': 'MeshLambertMaterial',
		'MeshMatcapMaterial': 'MeshMatcapMaterial',
		'MeshPhongMaterial': 'MeshPhongMaterial',
		'MeshToonMaterial': 'MeshToonMaterial',
		'MeshStandardMaterial': 'MeshStandardMaterial',
		'MeshPhysicalMaterial': 'MeshPhysicalMaterial',
		'RawShaderMaterial': 'RawShaderMaterial',
		'ShaderMaterial': 'ShaderMaterial',
		'ShadowMaterial': 'ShadowMaterial'
	};

	var lineMaterialOptions = {
		'LineBasicMaterial': 'LineBasicMaterial',
		'LineDashedMaterial': 'LineDashedMaterial',
		'RawShaderMaterial': 'RawShaderMaterial',
		'ShaderMaterial': 'ShaderMaterial'
	};

	var spriteMaterialOptions = {
		'SpriteMaterial': 'SpriteMaterial',
		'RawShaderMaterial': 'RawShaderMaterial',
		'ShaderMaterial': 'ShaderMaterial'
	};

	var pointsMaterialOptions = {
		'PointsMaterial': 'PointsMaterial',
		'RawShaderMaterial': 'RawShaderMaterial',
		'ShaderMaterial': 'ShaderMaterial'
	};

	return container;

}

export { SidebarMaterial };
