(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["streetfighter-street-fighter-module"],{

/***/ "./node_modules/@ngrx/entity/fesm2015/entity.js":
/*!******************************************************!*\
  !*** ./node_modules/@ngrx/entity/fesm2015/entity.js ***!
  \******************************************************/
/*! exports provided: createEntityAdapter, Dictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntityAdapter", function() { return createEntityAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dictionary", function() { return Dictionary; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/**
 * @license NgRx 8.2.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template V
 * @return {?}
 */
function getInitialEntityState() {
    return {
        ids: [],
        entities: {},
    };
}
/**
 * @template V
 * @return {?}
 */
function createInitialStateFactory() {
    /**
     * @param {?=} additionalState
     * @return {?}
     */
    function getInitialState(additionalState = {}) {
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @return {?}
 */
function createSelectorsFactory() {
    /**
     * @param {?=} selectState
     * @return {?}
     */
    function getSelectors(selectState) {
        /** @type {?} */
        const selectIds = (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.ids);
        /** @type {?} */
        const selectEntities = (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.entities);
        /** @type {?} */
        const selectAll = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectIds, selectEntities, (/**
         * @param {?} ids
         * @param {?} entities
         * @return {?}
         */
        (ids, entities) => ids.map((/**
         * @param {?} id
         * @return {?}
         */
        (id) => ((/** @type {?} */ (entities)))[id]))));
        /** @type {?} */
        const selectTotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectIds, (/**
         * @param {?} ids
         * @return {?}
         */
        ids => ids.length));
        if (!selectState) {
            return {
                selectIds,
                selectEntities,
                selectAll,
                selectTotal,
            };
        }
        return {
            selectIds: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectIds),
            selectEntities: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectEntities),
            selectAll: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectAll),
            selectTotal: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectTotal),
        };
    }
    return { getSelectors };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const DidMutate = {
    EntitiesOnly: 0,
    Both: 1,
    None: 2,
};
DidMutate[DidMutate.EntitiesOnly] = 'EntitiesOnly';
DidMutate[DidMutate.Both] = 'Both';
DidMutate[DidMutate.None] = 'None';
/**
 * @template V, R
 * @param {?} mutator
 * @return {?}
 */
function createStateOperator(mutator) {
    return (/**
     * @template S
     * @param {?} arg
     * @param {?} state
     * @return {?}
     */
    function operation(arg, state) {
        /** @type {?} */
        const clonedEntityState = {
            ids: [...state.ids],
            entities: Object.assign({}, state.entities),
        };
        /** @type {?} */
        const didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return Object.assign({}, state, { entities: clonedEntityState.entities });
        }
        return state;
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} entity
 * @param {?} selectId
 * @return {?}
 */
function selectIdValue(entity, selectId) {
    /** @type {?} */
    const key = selectId(entity);
    if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} selectId
 * @return {?}
 */
function createUnsortedStateAdapter(selectId) {
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function addOneMutably(entity, state) {
        /** @type {?} */
        const key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            return DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(entities, state) {
        /** @type {?} */
        let didMutate = false;
        for (const entity of entities) {
            didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return DidMutate.Both;
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    /**
     * @param {?} keysOrPredicate
     * @param {?} state
     * @return {?}
     */
    function removeManyMutably(keysOrPredicate, state) {
        /** @type {?} */
        const keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => keysOrPredicate(state.entities[key])));
        /** @type {?} */
        const didMutate = keys
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        (key) => key in state.entities))
            .map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => delete state.entities[key])).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @return {?}
             */
            (id) => id in state.entities));
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @template S
     * @param {?} state
     * @return {?}
     */
    function removeAll(state) {
        return Object.assign({}, state, {
            ids: [],
            entities: {},
        });
    }
    /**
     * @param {?} keys
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function takeNewKey(keys, update, state) {
        /** @type {?} */
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
        /** @type {?} */
        const hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        /** @type {?} */
        const newKeys = {};
        updates = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        update => update.id in state.entities));
        /** @type {?} */
        const didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            /** @type {?} */
            const didMutateIds = updates.filter((/**
             * @param {?} update
             * @return {?}
             */
            update => takeNewKey(newKeys, update, state))).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map((/**
                 * @param {?} id
                 * @return {?}
                 */
                (id) => newKeys[id] || id));
                return DidMutate.Both;
            }
            else {
                return DidMutate.EntitiesOnly;
            }
        }
        return DidMutate.None;
    }
    /**
     * @param {?} map
     * @param {?} state
     * @return {?}
     */
    function mapMutably(map, state) {
        /** @type {?} */
        const changes = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
        /** @type {?} */
        const updates = changes.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ id }) => id in state.entities));
        return updateManyMutably(updates, state);
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function upsertManyMutably(entities, state) {
        /** @type {?} */
        const added = [];
        /** @type {?} */
        const updated = [];
        for (const entity of entities) {
            /** @type {?} */
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        /** @type {?} */
        const didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        const didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === DidMutate.None &&
                didMutateByUpdated === DidMutate.None:
                return DidMutate.None;
            case didMutateByAdded === DidMutate.Both ||
                didMutateByUpdated === DidMutate.Both:
                return DidMutate.Both;
            default:
                return DidMutate.EntitiesOnly;
        }
    }
    return {
        removeAll,
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        addAll: createStateOperator(addAllMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably),
        map: createStateOperator(mapMutably),
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} selectId
 * @param {?} sort
 * @return {?}
 */
function createSortedStateAdapter(selectId, sort) {
    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
    }
    /**
     * @param {?} newModels
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(newModels, state) {
        /** @type {?} */
        const models = newModels.filter((/**
         * @param {?} model
         * @return {?}
         */
        model => !(selectIdValue(model, selectId) in state.entities)));
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            merge(models, state);
            return DidMutate.Both;
        }
    }
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function addAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return DidMutate.Both;
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    /**
     * @param {?} models
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        /** @type {?} */
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        /** @type {?} */
        const models = [];
        /** @type {?} */
        const didMutateIds = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        update => takeUpdatedModel(models, update, state))).length >
            0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            /** @type {?} */
            const originalIds = state.ids;
            /** @type {?} */
            const updatedIndexes = [];
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @param {?} index
             * @return {?}
             */
            (id, index) => {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes.push(index);
                    return false;
                }
            }));
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes.every((/**
                 * @param {?} i
                 * @return {?}
                 */
                (i) => state.ids[i] === originalIds[i]))) {
                return DidMutate.EntitiesOnly;
            }
            else {
                return DidMutate.Both;
            }
        }
    }
    /**
     * @param {?} updatesOrMap
     * @param {?} state
     * @return {?}
     */
    function mapMutably(updatesOrMap, state) {
        /** @type {?} */
        const updates = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
        return updateManyMutably(updates, state);
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function upsertManyMutably(entities, state) {
        /** @type {?} */
        const added = [];
        /** @type {?} */
        const updated = [];
        for (const entity of entities) {
            /** @type {?} */
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        /** @type {?} */
        const didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        const didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === DidMutate.None &&
                didMutateByUpdated === DidMutate.None:
                return DidMutate.None;
            case didMutateByAdded === DidMutate.Both ||
                didMutateByUpdated === DidMutate.Both:
                return DidMutate.Both;
            default:
                return DidMutate.EntitiesOnly;
        }
    }
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function merge(models, state) {
        models.sort(sort);
        /** @type {?} */
        const ids = [];
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let j = 0;
        while (i < models.length && j < state.ids.length) {
            /** @type {?} */
            const model = models[i];
            /** @type {?} */
            const modelId = selectIdValue(model, selectId);
            /** @type {?} */
            const entityId = state.ids[j];
            /** @type {?} */
            const entity = state.entities[entityId];
            if (sort(model, entity) <= 0) {
                ids.push(modelId);
                i++;
            }
            else {
                ids.push(entityId);
                j++;
            }
        }
        if (i < models.length) {
            state.ids = ids.concat(models.slice(i).map(selectId));
        }
        else {
            state.ids = ids.concat(state.ids.slice(j));
        }
        models.forEach((/**
         * @param {?} model
         * @param {?} i
         * @return {?}
         */
        (model, i) => {
            state.entities[selectId(model)] = model;
        }));
    }
    return {
        removeOne,
        removeMany,
        removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        addAll: createStateOperator(addAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        map: createStateOperator(mapMutably),
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?=} options
 * @return {?}
 */
function createEntityAdapter(options = {}) {
    const { selectId, sortComparer } = Object.assign({ sortComparer: false, selectId: (/**
         * @param {?} instance
         * @return {?}
         */
        (instance) => instance.id) }, options);
    /** @type {?} */
    const stateFactory = createInitialStateFactory();
    /** @type {?} */
    const selectorsFactory = createSelectorsFactory();
    /** @type {?} */
    const stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return Object.assign({ selectId,
        sortComparer }, stateFactory, selectorsFactory, stateAdapter);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class Dictionary {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=entity.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/streetfighter/components/fighter-detail/fighter-detail.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/streetfighter/components/fighter-detail/fighter-detail.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"fighterForm\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>\r\n        <label *ngIf=\"fighterForm.get('id').value\">Editar</label>\r\n        <label *ngIf=\"!fighterForm.get('id').value\">Novo</label>\r\n      </mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <mat-form-field>\r\n        <input matInput type=\"text\" placeholder=\"Name\" formControlName=\"name\" value=\"{{fighterForm.value?.name}}\" required>\r\n      </mat-form-field>\r\n    </mat-card-content>\r\n    <mat-card-content>\r\n      <mat-form-field>\r\n        <input matInput type=\"text\" placeholder=\"Country\" formControlName=\"country\" value=\"{{fighterForm.value?.country}}\" required>\r\n      </mat-form-field>\r\n    </mat-card-content>\r\n    <mat-card-content>\r\n      <mat-form-field>\r\n        <input matInput type=\"text\" placeholder=\"Fighting Style\" formControlName=\"fightingStyle\" value=\"{{fighterForm.value?.fightingStyle}}\" required>\r\n      </mat-form-field>\r\n    </mat-card-content>\r\n    <mat-card-actions>\r\n      <button mat-flat-button routerLink=\"../fighters\" [disabled]=\"fighterForm.invalid\" (click)=\"!fighterForm.invalid && update()\" color=\"primary\">Salvar</button>\r\n      <button mat-flat-button *ngIf=\"fighterForm.get('id').value\" (click)=\"delete()\" color=\"primary\">Excluir</button>\r\n      <button mat-flat-button routerLink=\"../fighters\" (click)=\"unselect()\" color=\"primary\">Voltar</button>\r\n    </mat-card-actions>\r\n  </mat-card>\r\n</form>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/streetfighter/components/fighter-list/fighter-list.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/streetfighter/components/fighter-list/fighter-list.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-list>\r\n  <mat-list-item *ngFor=\"let card of cards\" (click)=\"select(card)\" routerLink=\"../fighter\">\r\n    {{card.name}}\r\n  </mat-list-item>\r\n</mat-list>\r\n\r\n<button mat-fab class=\"fab-bottom-right\" routerLink=\"../fighter\">\r\n  <mat-icon>add</mat-icon>\r\n</button>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/streetfighter/containers/fighter/fighter.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/streetfighter/containers/fighter/fighter.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-fighter-detail [card]=\"card$ | async\" (actionEmitter)=\"dispatch($event)\"></app-fighter-detail>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/streetfighter/containers/fighters/fighters.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/streetfighter/containers/fighters/fighters.component.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" fxLayout=\"column\" fxLayoutAlign=\"start\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>Cartas cadastradas</mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <app-fighter-list [cards]=\"cards$ | async\" (actionEmitter)=\"dispatch($event)\"></app-fighter-list>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/streetfighter/components/fighter-detail/fighter-detail.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/streetfighter/components/fighter-detail/fighter-detail.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0cmVldGZpZ2h0ZXIvY29tcG9uZW50cy9maWdodGVyLWRldGFpbC9maWdodGVyLWRldGFpbC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/streetfighter/components/fighter-detail/fighter-detail.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/streetfighter/components/fighter-detail/fighter-detail.component.ts ***!
  \*************************************************************************************/
/*! exports provided: FighterDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FighterDetailComponent", function() { return FighterDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");




let FighterDetailComponent = class FighterDetailComponent {
    constructor(fb) {
        this.fb = fb;
        this.fighterForm = this.fb.group({
            id: [''],
            name: [''],
            country: [''],
            fightingStyle: ['']
        });
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    set card(card) {
        this.fighterForm.patchValue(card);
    }
    ngOnInit() {
    }
    unselect() {
        this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["unselectCard"])());
    }
    update() {
        if (this.fighterForm.get('id') && this.fighterForm.get('id').value !== '') {
            this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["updateCard"])({ card: this.fighterForm.value }));
        }
        else {
            this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["createCard"])({ card: this.fighterForm.value }));
        }
    }
    delete() {
        this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["deleteCard"])({ id: this.fighterForm.get('id').value }));
    }
};
FighterDetailComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], FighterDetailComponent.prototype, "card", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], FighterDetailComponent.prototype, "actionEmitter", void 0);
FighterDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fighter-detail',
        template: __webpack_require__(/*! raw-loader!./fighter-detail.component.html */ "./node_modules/raw-loader/index.js!./src/app/streetfighter/components/fighter-detail/fighter-detail.component.html"),
        styles: [__webpack_require__(/*! ./fighter-detail.component.scss */ "./src/app/streetfighter/components/fighter-detail/fighter-detail.component.scss")]
    })
], FighterDetailComponent);



/***/ }),

/***/ "./src/app/streetfighter/components/fighter-list/fighter-list.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/streetfighter/components/fighter-list/fighter-list.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0cmVldGZpZ2h0ZXIvY29tcG9uZW50cy9maWdodGVyLWxpc3QvZmlnaHRlci1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/streetfighter/components/fighter-list/fighter-list.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/streetfighter/components/fighter-list/fighter-list.component.ts ***!
  \*********************************************************************************/
/*! exports provided: FighterListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FighterListComponent", function() { return FighterListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");



let FighterListComponent = class FighterListComponent {
    constructor() {
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
    }
    select(card) {
        this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["selectCard"])({ card }));
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], FighterListComponent.prototype, "cards", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], FighterListComponent.prototype, "actionEmitter", void 0);
FighterListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fighter-list',
        template: __webpack_require__(/*! raw-loader!./fighter-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/streetfighter/components/fighter-list/fighter-list.component.html"),
        styles: [__webpack_require__(/*! ./fighter-list.component.scss */ "./src/app/streetfighter/components/fighter-list/fighter-list.component.scss")]
    })
], FighterListComponent);



/***/ }),

/***/ "./src/app/streetfighter/containers/fighter/fighter.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/streetfighter/containers/fighter/fighter.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0cmVldGZpZ2h0ZXIvY29udGFpbmVycy9maWdodGVyL2ZpZ2h0ZXIuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/streetfighter/containers/fighter/fighter.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/streetfighter/containers/fighter/fighter.component.ts ***!
  \***********************************************************************/
/*! exports provided: FighterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FighterComponent", function() { return FighterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/cards.selectors */ "./src/app/streetfighter/store/selectors/cards.selectors.ts");




let FighterComponent = class FighterComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.card$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__["getCard"]));
    }
    dispatch(action) {
        this.store.dispatch(action);
    }
};
FighterComponent.ctorParameters = () => [
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
];
FighterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fighter',
        template: __webpack_require__(/*! raw-loader!./fighter.component.html */ "./node_modules/raw-loader/index.js!./src/app/streetfighter/containers/fighter/fighter.component.html"),
        styles: [__webpack_require__(/*! ./fighter.component.scss */ "./src/app/streetfighter/containers/fighter/fighter.component.scss")]
    })
], FighterComponent);



/***/ }),

/***/ "./src/app/streetfighter/containers/fighters/fighters.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/streetfighter/containers/fighters/fighters.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0cmVldGZpZ2h0ZXIvY29udGFpbmVycy9maWdodGVycy9maWdodGVycy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/streetfighter/containers/fighters/fighters.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/streetfighter/containers/fighters/fighters.component.ts ***!
  \*************************************************************************/
/*! exports provided: FightersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FightersComponent", function() { return FightersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/cards.selectors */ "./src/app/streetfighter/store/selectors/cards.selectors.ts");




let FightersComponent = class FightersComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.cards$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__["getAllCards"]));
    }
    dispatch(action) {
        this.store.dispatch(action);
    }
};
FightersComponent.ctorParameters = () => [
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
];
FightersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fighters',
        template: __webpack_require__(/*! raw-loader!./fighters.component.html */ "./node_modules/raw-loader/index.js!./src/app/streetfighter/containers/fighters/fighters.component.html"),
        styles: [__webpack_require__(/*! ./fighters.component.scss */ "./src/app/streetfighter/containers/fighters/fighters.component.scss")]
    })
], FightersComponent);



/***/ }),

/***/ "./src/app/streetfighter/store/actions/cards.actions.ts":
/*!**************************************************************!*\
  !*** ./src/app/streetfighter/store/actions/cards.actions.ts ***!
  \**************************************************************/
/*! exports provided: updateCardsList, createCard, updateCard, deleteCard, selectCard, unselectCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCardsList", function() { return updateCardsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCard", function() { return createCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCard", function() { return updateCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCard", function() { return deleteCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCard", function() { return selectCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unselectCard", function() { return unselectCard; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");

const updateCardsList = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Update cards list.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const createCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Create card.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Update card.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const deleteCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Delete cards.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const selectCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Select card.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const unselectCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Unselect card.');


/***/ }),

/***/ "./src/app/streetfighter/store/effects/cards.effects.ts":
/*!**************************************************************!*\
  !*** ./src/app/streetfighter/store/effects/cards.effects.ts ***!
  \**************************************************************/
/*! exports provided: CardsEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardsEffects", function() { return CardsEffects; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm2015/effects.js");
/* harmony import */ var _actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store/actions/app.actions */ "./src/app/store/actions/app.actions.ts");
/* harmony import */ var _core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/store/actions/core.actions */ "./src/app/core/store/actions/core.actions.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");









let CardsEffects = class CardsEffects {
    constructor(action$, firestore) {
        this.action$ = action$;
        this.firestore = firestore;
        this.updateCardsList$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(() => this.firestore.collection('fighters').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(cards => Object(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["updateCardsList"])({ cards }))));
        this.updateCard$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(() => this.action$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["updateCard"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])((action) => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.firestore.doc(`fighters/${action.card.id}`).set(action.card)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])([
            Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__["navigateTo"])({ commands: ['core', 'layout', 'streetfighter', 'fighters'] }),
            Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({ message: `${action.card.name} updated`, config: {} })
        ])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({
            message: 'Something went wrong.', config: {
                duration: 5000
            }
        })))))));
        this.deleteCard$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(() => this.action$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["deleteCard"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])((action) => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.firestore.doc(`fighters/${action.id}`).delete()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])([
            Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__["navigateTo"])({ commands: ['core', 'layout', 'streetfighter', 'fighters'] }),
            Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({ message: 'Card deleted', config: {} })
        ])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({
            message: 'Something went wrong.', config: {
                duration: 5000
            }
        })))))));
        this.createCard$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(() => this.action$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["createCard"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])((action) => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.firestore.doc(`fighters/${this.createId()}`).set({
            id: this.newId,
            name: action.card.name,
            country: action.card.country,
            fightingStyle: action.card.fightingStyle
        })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])([
            Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__["navigateTo"])({ commands: ['core', 'layout', 'streetfighter', 'fighters'] }),
            Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({ message: `${action.card.name} created`, config: {} })
        ])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({
            message: 'Something went wrong', config: {
                duration: 5000
            }
        })))))));
    }
    createId() {
        this.newId = this.firestore.createId();
        return this.newId;
    }
};
CardsEffects.ctorParameters = () => [
    { type: _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Actions"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] }
];
CardsEffects = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], CardsEffects);



/***/ }),

/***/ "./src/app/streetfighter/store/reducers/cards.reducer.ts":
/*!***************************************************************!*\
  !*** ./src/app/streetfighter/store/reducers/cards.reducer.ts ***!
  \***************************************************************/
/*! exports provided: cardAdapter, reducerCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cardAdapter", function() { return cardAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducerCards", function() { return reducerCards; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");
/* harmony import */ var _ngrx_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/entity */ "./node_modules/@ngrx/entity/fesm2015/entity.js");




const cardAdapter = Object(_ngrx_entity__WEBPACK_IMPORTED_MODULE_3__["createEntityAdapter"])({
    selectId: fighter => fighter.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});
// const pog = [
//  {id: 1, name: 'Ryu',  country: 'Japan', fightingStyle: 'Karate'},
//  {id: 2, name: 'Chun-li',  country: 'China', fightingStyle: 'Kung Fu'},
//  {id: 3, name: 'Guile',  country: 'USA', fightingStyle: 'Military Fighting' },
//  {id: 4, name: 'Zangief',  country: 'Russia', fightingStyle: 'Wrestling'},
//  {id: 5, name: 'Dhalsim',  country: 'India', fightingStyle: 'Yoga'},
//  {id: 6, name: 'Ken',  country: 'USA', fightingStyle: 'Karate' },
//  {id: 7, name: 'Cammy',  country: 'England', fightingStyle: 'Military Special Forces Fighting Style' },
//  {id: 8, name: 'Blanka',  country: 'Brazil', fightingStyle: 'Jungle Wild Fighting Style' }
// ];
const initialState = cardAdapter.getInitialState();
// const initialState = cardAdapter.addAll(pog, cardAdapter.getInitialState());
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["updateCardsList"], (state, { cards }) => cardAdapter.addAll(cards, state)), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["selectCard"], (state, { card }) => (Object.assign({}, state, { card }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["unselectCard"], _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["updateCard"], _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["createCard"], _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["deleteCard"], (state) => {
    const { card } = state, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](state, ["card"]);
    return rest;
}) // ,
// on(createCard, (state, {card}) => cardAdapter.addOne(card, state)),
// on(deleteCard, (state, {id}) => cardAdapter.removeOne(id, state))
);
function reducerCards(state, action) {
    return reducer(state, action);
}


/***/ }),

/***/ "./src/app/streetfighter/store/reducers/global.reducer.ts":
/*!****************************************************************!*\
  !*** ./src/app/streetfighter/store/reducers/global.reducer.ts ***!
  \****************************************************************/
/*! exports provided: fighterReducer, getFighterState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fighterReducer", function() { return fighterReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFighterState", function() { return getFighterState; });
/* harmony import */ var _cards_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards.reducer */ "./src/app/streetfighter/store/reducers/cards.reducer.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");


;
const fighterReducer = {
    cards: _cards_reducer__WEBPACK_IMPORTED_MODULE_0__["reducerCards"]
};
const getFighterState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createFeatureSelector"])('fighter');


/***/ }),

/***/ "./src/app/streetfighter/store/selectors/cards.selectors.ts":
/*!******************************************************************!*\
  !*** ./src/app/streetfighter/store/selectors/cards.selectors.ts ***!
  \******************************************************************/
/*! exports provided: getCardsState, getAllCards, getCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCardsState", function() { return getCardsState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCards", function() { return getAllCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCard", function() { return getCard; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _reducers_global_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/global.reducer */ "./src/app/streetfighter/store/reducers/global.reducer.ts");
/* harmony import */ var _reducers_cards_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/cards.reducer */ "./src/app/streetfighter/store/reducers/cards.reducer.ts");



const getCardsState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_reducers_global_reducer__WEBPACK_IMPORTED_MODULE_1__["getFighterState"], state => state.cards);
const getAllCards = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getCardsState, state => _reducers_cards_reducer__WEBPACK_IMPORTED_MODULE_2__["cardAdapter"].getSelectors().selectAll(state));
const getCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getCardsState, state => state.card);


/***/ }),

/***/ "./src/app/streetfighter/street-fighter-routing.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/streetfighter/street-fighter-routing.module.ts ***!
  \****************************************************************/
/*! exports provided: StreetFighterRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreetFighterRoutingModule", function() { return StreetFighterRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _containers_fighters_fighters_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/fighters/fighters.component */ "./src/app/streetfighter/containers/fighters/fighters.component.ts");
/* harmony import */ var _containers_fighter_fighter_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/fighter/fighter.component */ "./src/app/streetfighter/containers/fighter/fighter.component.ts");





const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'fighters' },
    { path: 'fighters', component: _containers_fighters_fighters_component__WEBPACK_IMPORTED_MODULE_3__["FightersComponent"] },
    { path: 'fighter', component: _containers_fighter_fighter_component__WEBPACK_IMPORTED_MODULE_4__["FighterComponent"] }
];
let StreetFighterRoutingModule = class StreetFighterRoutingModule {
};
StreetFighterRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], StreetFighterRoutingModule);



/***/ }),

/***/ "./src/app/streetfighter/street-fighter.module.ts":
/*!********************************************************!*\
  !*** ./src/app/streetfighter/street-fighter.module.ts ***!
  \********************************************************/
/*! exports provided: StreetFighterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StreetFighterModule", function() { return StreetFighterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _street_fighter_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./street-fighter-routing.module */ "./src/app/streetfighter/street-fighter-routing.module.ts");
/* harmony import */ var _containers_fighters_fighters_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/fighters/fighters.component */ "./src/app/streetfighter/containers/fighters/fighters.component.ts");
/* harmony import */ var _containers_fighter_fighter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./containers/fighter/fighter.component */ "./src/app/streetfighter/containers/fighter/fighter.component.ts");
/* harmony import */ var _components_fighter_list_fighter_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/fighter-list/fighter-list.component */ "./src/app/streetfighter/components/fighter-list/fighter-list.component.ts");
/* harmony import */ var _components_fighter_detail_fighter_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/fighter-detail/fighter-detail.component */ "./src/app/streetfighter/components/fighter-detail/fighter-detail.component.ts");
/* harmony import */ var _core_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/shared/shared.module */ "./src/app/core/shared/shared.module.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _store_reducers_global_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./store/reducers/global.reducer */ "./src/app/streetfighter/store/reducers/global.reducer.ts");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm2015/effects.js");
/* harmony import */ var _store_effects_cards_effects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./store/effects/cards.effects */ "./src/app/streetfighter/store/effects/cards.effects.ts");













let StreetFighterModule = class StreetFighterModule {
};
StreetFighterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_containers_fighters_fighters_component__WEBPACK_IMPORTED_MODULE_4__["FightersComponent"], _containers_fighter_fighter_component__WEBPACK_IMPORTED_MODULE_5__["FighterComponent"], _components_fighter_list_fighter_list_component__WEBPACK_IMPORTED_MODULE_6__["FighterListComponent"], _components_fighter_detail_fighter_detail_component__WEBPACK_IMPORTED_MODULE_7__["FighterDetailComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _core_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            _street_fighter_routing_module__WEBPACK_IMPORTED_MODULE_3__["StreetFighterRoutingModule"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["StoreModule"].forFeature('fighter', _store_reducers_global_reducer__WEBPACK_IMPORTED_MODULE_10__["fighterReducer"]),
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__["EffectsModule"].forFeature([_store_effects_cards_effects__WEBPACK_IMPORTED_MODULE_12__["CardsEffects"]])
        ]
    })
], StreetFighterModule);



/***/ })

}]);
//# sourceMappingURL=streetfighter-street-fighter-module-es2015.js.map