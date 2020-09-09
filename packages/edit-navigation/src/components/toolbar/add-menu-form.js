/**
 * External dependencies
 */
import { some } from 'lodash';

/**
 * WordPress dependencies
 */
import { useState, useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { Icon, TextControl, Button } from '@wordpress/components';
import { navigation } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

const menuNameMatches = ( menuName ) => ( menu ) =>
	menu.name.toLowerCase() === menuName.toLowerCase();

export default function AddMenuForm( { menus, onCancel, onCreate } ) {
	const [ menuName, setMenuName ] = useState( '' );

	const { createErrorNotice, createInfoNotice } = useDispatch(
		'core/notices'
	);

	const [ isCreatingMenu, setIsCreatingMenu ] = useState( false );

	const { saveMenu } = useDispatch( 'core' );

	const createMenu = useCallback(
		async ( event ) => {
			event.preventDefault();

			if ( ! menuName.length ) {
				return;
			}

			if ( some( menus, menuNameMatches( menuName ) ) ) {
				const message = sprintf(
					// translators: %s: the name of a menu.
					__(
						'The menu name %s conflicts with another menu name. Please try another.'
					),
					menuName
				);
				createErrorNotice( message, { id: 'edit-navigation-error' } );
				return;
			}

			setIsCreatingMenu( true );

			const menu = await saveMenu( { name: menuName } );
			if ( menu ) {
				createInfoNotice( __( 'Menu created' ), {
					type: 'snackbar',
					isDismissible: true,
				} );
				onCreate( menu.id );
			}

			setIsCreatingMenu( false );
		},
		[ menuName, menus ]
	);

	return (
		<form
			className="edit-navigation-toolbar__add-menu-form"
			onSubmit={ createMenu }
		>
			<Icon
				className="edit-navigation-toolbar__add-menu-icon"
				icon={ navigation }
			/>

			<TextControl
				className="edit-navigation-toolbar__add-menu-name-field"
				// Disable reason: The name field should receive focus when
				// component mounts.
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus
				label={ __( 'New menu name' ) }
				placeholder={ __( 'New menu name' ) }
				hideLabelFromVision
				value={ menuName }
				onChange={ setMenuName }
			/>

			<Button
				className="edit-navigation-toolbar__add-menu-cancel-button"
				isLink
				onClick={ onCancel }
			>
				{ __( 'Cancel' ) }
			</Button>

			<Button
				className="edit-navigation-toolbar__add-menu-create-button"
				type="submit"
				isPrimary
				disabled={ ! menuName.length }
				isBusy={ isCreatingMenu }
			>
				{ __( 'Create menu' ) }
			</Button>
		</form>
	);
}
