/**
 * WordPress dependencies
 */
import { LINK_COLOR } from '@wordpress/blocks';

/* Supporting data */
export const GLOBAL_CONTEXT = 'global';
export const PRESET_CATEGORIES = [ 'color', 'font-size', 'gradient' ];
export const LINK_COLOR_DECLARATION = `a { color: var(${ LINK_COLOR }, #00e); }`;

/* Helpers for unit processing */
export const fromPx = ( value ) => {
	switch ( typeof value ) {
		case 'string':
			return +value.replace( 'px', '' );
		case 'number':
		default:
			return value;
	}
};

export const toPx = ( value ) => ( value ? value + 'px' : value );
