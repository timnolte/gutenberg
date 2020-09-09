/**
 * Internal dependencies
 */
import ListView from './list-view';
import VisualView from './visual-view';

export default function Editor( { isPending, blocks } ) {
	return (
		<div className="edit-navigation-editor">
			<ListView isPending={ isPending } blocks={ blocks } />
			<VisualView isPending={ isPending } />
		</div>
	);
}
