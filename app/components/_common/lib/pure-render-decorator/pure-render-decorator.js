'use strict';

import { is } from 'immutable';

function shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
}

function shallowCompare(instance, nextProps, nextState) {
    return !shallowEqualImmutable(instance.props, nextProps) || !shallowEqualImmutable(instance.state, nextState);
}

function shallowEqualImmutable(objA, objB) {
    if (objA === objB || is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

export default function pureRenderDecorator(Component) {
    Component.prototype.shouldComponentUpdate = shouldComponentUpdate;
    return Component;
}
