import controlled from '../controlled/controlled';
import validating from '../validating/validating';

/**
 * Conveniently creates a controlled component that also performs value validation
 * 
 * @param {any} WrappedComponent Component to wrap with value control and validation
 * @returns {any}
 */
function validatingControlled(WrappedComponent) {
  return controlled(validating(WrappedComponent));
}

export default validatingControlled;
