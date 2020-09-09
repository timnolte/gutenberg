/**
 * External dependencies
 */
import classnames from 'classnames';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { Icon, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Button from '../button';
import { useNavigationContext } from './context';
import {
	BadgeUI,
	MenuItemTitleUI,
	MenuItemUI,
} from './styles/navigation-styles';

export default function NavigationItem( {
	badge,
	children,
	href,
	item,
	navigateToLevel,
	onClick = noop,
	title,
	...props
} ) {
	const {
		activeItem,
		setActiveItem,
		setActiveLevel,
	} = useNavigationContext();

	const classes = classnames( 'components-navigation__menu-item', {
		'is-active': item && activeItem === item,
	} );

	const onItemClick = () => {
		if ( navigateToLevel ) {
			setActiveLevel( navigateToLevel );
		} else if ( ! href ) {
			setActiveItem( item );
		}
		onClick();
	};

	return (
		<MenuItemUI className={ classes }>
			<Button href={ href } onClick={ onItemClick } { ...props }>
				{ title && (
					<MenuItemTitleUI
						className="components-navigation__menu-item-title"
						variant="body.small"
						as="span"
					>
						{ title }
					</MenuItemTitleUI>
				) }

				{ children }

				{ badge && (
					<BadgeUI className="components-navigation__menu-item-badge">
						{ badge }
					</BadgeUI>
				) }

				{ navigateToLevel && <Icon icon={ chevronRight } /> }
			</Button>
		</MenuItemUI>
	);
}
