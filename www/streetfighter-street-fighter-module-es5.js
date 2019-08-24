(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["streetfighter-street-fighter-module"],{

/***/ "./node_modules/@ngrx/entity/fesm5/entity.js":
/*!***************************************************!*\
  !*** ./node_modules/@ngrx/entity/fesm5/entity.js ***!
  \***************************************************/
/*! exports provided: createEntityAdapter, Dictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntityAdapter", function() { return createEntityAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dictionary", function() { return Dictionary; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/**
 * @license NgRx 8.2.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */




function getInitialEntityState() {
    return {
        ids: [],
        entities: {},
    };
}
function createInitialStateFactory() {
    function getInitialState(additionalState) {
        if (additionalState === void 0) { additionalState = {}; }
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState: getInitialState };
}

function createSelectorsFactory() {
    function getSelectors(selectState) {
        var selectIds = function (state) { return state.ids; };
        var selectEntities = function (state) { return state.entities; };
        var selectAll = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectIds, selectEntities, function (ids, entities) {
            return ids.map(function (id) { return entities[id]; });
        });
        var selectTotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectIds, function (ids) { return ids.length; });
        if (!selectState) {
            return {
                selectIds: selectIds,
                selectEntities: selectEntities,
                selectAll: selectAll,
                selectTotal: selectTotal,
            };
        }
        return {
            selectIds: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectIds),
            selectEntities: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectEntities),
            selectAll: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectAll),
            selectTotal: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectTotal),
        };
    }
    return { getSelectors: getSelectors };
}

var DidMutate;
(function (DidMutate) {
    DidMutate[DidMutate["EntitiesOnly"] = 0] = "EntitiesOnly";
    DidMutate[DidMutate["Both"] = 1] = "Both";
    DidMutate[DidMutate["None"] = 2] = "None";
})(DidMutate || (DidMutate = {}));
function createStateOperator(mutator) {
    return function operation(arg, state) {
        var clonedEntityState = {
            ids: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(state.ids),
            entities: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state.entities),
        };
        var didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state, { entities: clonedEntityState.entities });
        }
        return state;
    };
}

function selectIdValue(entity, selectId) {
    var key = selectId(entity);
    if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["isDevMode"])() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}

function createUnsortedStateAdapter(selectId) {
    function addOneMutably(entity, state) {
        var key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            return DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    function addManyMutably(entities, state) {
        var e_1, _a;
        var didMutate = false;
        try {
            for (var entities_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    function addAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return DidMutate.Both;
    }
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    function removeManyMutably(keysOrPredicate, state) {
        var keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter(function (key) { return keysOrPredicate(state.entities[key]); });
        var didMutate = keys
            .filter(function (key) { return key in state.entities; })
            .map(function (key) { return delete state.entities[key]; }).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter(function (id) { return id in state.entities; });
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    function removeAll(state) {
        return Object.assign({}, state, {
            ids: [],
            entities: {},
        });
    }
    function takeNewKey(keys, update, state) {
        var original = state.entities[update.id];
        var updated = Object.assign({}, original, update.changes);
        var newKey = selectIdValue(updated, selectId);
        var hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function updateManyMutably(updates, state) {
        var newKeys = {};
        updates = updates.filter(function (update) { return update.id in state.entities; });
        var didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            var didMutateIds = updates.filter(function (update) { return takeNewKey(newKeys, update, state); }).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map(function (id) { return newKeys[id] || id; });
                return DidMutate.Both;
            }
            else {
                return DidMutate.EntitiesOnly;
            }
        }
        return DidMutate.None;
    }
    function mapMutably(map, state) {
        var changes = state.ids.reduce(function (changes, id) {
            var change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id: id, changes: change });
            }
            return changes;
        }, []);
        var updates = changes.filter(function (_a) {
            var id = _a.id;
            return id in state.entities;
        });
        return updateManyMutably(updates, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(entities, state) {
        var e_2, _a;
        var added = [];
        var updated = [];
        try {
            for (var entities_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(entities), entities_2_1 = entities_2.next(); !entities_2_1.done; entities_2_1 = entities_2.next()) {
                var entity = entities_2_1.value;
                var id = selectIdValue(entity, selectId);
                if (id in state.entities) {
                    updated.push({ id: id, changes: entity });
                }
                else {
                    added.push(entity);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (entities_2_1 && !entities_2_1.done && (_a = entities_2.return)) _a.call(entities_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var didMutateByUpdated = updateManyMutably(updated, state);
        var didMutateByAdded = addManyMutably(added, state);
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
        removeAll: removeAll,
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

function createSortedStateAdapter(selectId, sort) {
    var _a = createUnsortedStateAdapter(selectId), removeOne = _a.removeOne, removeMany = _a.removeMany, removeAll = _a.removeAll;
    function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
    }
    function addManyMutably(newModels, state) {
        var models = newModels.filter(function (model) { return !(selectIdValue(model, selectId) in state.entities); });
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            merge(models, state);
            return DidMutate.Both;
        }
    }
    function addAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return DidMutate.Both;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        var original = state.entities[update.id];
        var updated = Object.assign({}, original, update.changes);
        var newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    function updateManyMutably(updates, state) {
        var models = [];
        var didMutateIds = updates.filter(function (update) { return takeUpdatedModel(models, update, state); }).length >
            0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            var originalIds_1 = state.ids;
            var updatedIndexes_1 = [];
            state.ids = state.ids.filter(function (id, index) {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes_1.push(index);
                    return false;
                }
            });
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes_1.every(function (i) { return state.ids[i] === originalIds_1[i]; })) {
                return DidMutate.EntitiesOnly;
            }
            else {
                return DidMutate.Both;
            }
        }
    }
    function mapMutably(updatesOrMap, state) {
        var updates = state.ids.reduce(function (changes, id) {
            var change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id: id, changes: change });
            }
            return changes;
        }, []);
        return updateManyMutably(updates, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(entities, state) {
        var e_1, _a;
        var added = [];
        var updated = [];
        try {
            for (var entities_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                var id = selectIdValue(entity, selectId);
                if (id in state.entities) {
                    updated.push({ id: id, changes: entity });
                }
                else {
                    added.push(entity);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var didMutateByUpdated = updateManyMutably(updated, state);
        var didMutateByAdded = addManyMutably(added, state);
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
    function merge(models, state) {
        models.sort(sort);
        var ids = [];
        var i = 0;
        var j = 0;
        while (i < models.length && j < state.ids.length) {
            var model = models[i];
            var modelId = selectIdValue(model, selectId);
            var entityId = state.ids[j];
            var entity = state.entities[entityId];
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
        models.forEach(function (model, i) {
            state.entities[selectId(model)] = model;
        });
    }
    return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
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

function createEntityAdapter(options) {
    if (options === void 0) { options = {}; }
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ sortComparer: false, selectId: function (instance) { return instance.id; } }, options), selectId = _a.selectId, sortComparer = _a.sortComparer;
    var stateFactory = createInitialStateFactory();
    var selectorsFactory = createSelectorsFactory();
    var stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ selectId: selectId,
        sortComparer: sortComparer }, stateFactory, selectorsFactory, stateAdapter);
}

var Dictionary = /** @class */ (function () {
    function Dictionary() {
    }
    return Dictionary;
}());

/**
 * DO NOT EDIT
 *
 * This file is automatically generated at build
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");




var FighterDetailComponent = /** @class */ (function () {
    function FighterDetailComponent(fb) {
        this.fb = fb;
        this.fighterForm = this.fb.group({
            id: [''],
            name: [''],
            country: [''],
            fightingStyle: ['']
        });
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(FighterDetailComponent.prototype, "card", {
        set: function (card) {
            this.fighterForm.patchValue(card);
        },
        enumerable: true,
        configurable: true
    });
    FighterDetailComponent.prototype.ngOnInit = function () {
    };
    FighterDetailComponent.prototype.unselect = function () {
        this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["unselectCard"])());
    };
    FighterDetailComponent.prototype.update = function () {
        if (this.fighterForm.get('id') && this.fighterForm.get('id').value !== '') {
            this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["updateCard"])({ card: this.fighterForm.value }));
        }
        else {
            this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["createCard"])({ card: this.fighterForm.value }));
        }
    };
    FighterDetailComponent.prototype.delete = function () {
        this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["deleteCard"])({ id: this.fighterForm.get('id').value }));
    };
    FighterDetailComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
    ]; };
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
    return FighterDetailComponent;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");



var FighterListComponent = /** @class */ (function () {
    function FighterListComponent() {
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    FighterListComponent.prototype.ngOnInit = function () {
    };
    FighterListComponent.prototype.select = function (card) {
        this.actionEmitter.emit(Object(_store_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["selectCard"])({ card: card }));
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
    return FighterListComponent;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/cards.selectors */ "./src/app/streetfighter/store/selectors/cards.selectors.ts");




var FighterComponent = /** @class */ (function () {
    function FighterComponent(store) {
        this.store = store;
    }
    FighterComponent.prototype.ngOnInit = function () {
        this.card$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__["getCard"]));
    };
    FighterComponent.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    FighterComponent.ctorParameters = function () { return [
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
    ]; };
    FighterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-fighter',
            template: __webpack_require__(/*! raw-loader!./fighter.component.html */ "./node_modules/raw-loader/index.js!./src/app/streetfighter/containers/fighter/fighter.component.html"),
            styles: [__webpack_require__(/*! ./fighter.component.scss */ "./src/app/streetfighter/containers/fighter/fighter.component.scss")]
        })
    ], FighterComponent);
    return FighterComponent;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/cards.selectors */ "./src/app/streetfighter/store/selectors/cards.selectors.ts");




var FightersComponent = /** @class */ (function () {
    function FightersComponent(store) {
        this.store = store;
    }
    FightersComponent.prototype.ngOnInit = function () {
        this.cards$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_cards_selectors__WEBPACK_IMPORTED_MODULE_3__["getAllCards"]));
    };
    FightersComponent.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    FightersComponent.ctorParameters = function () { return [
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
    ]; };
    FightersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-fighters',
            template: __webpack_require__(/*! raw-loader!./fighters.component.html */ "./node_modules/raw-loader/index.js!./src/app/streetfighter/containers/fighters/fighters.component.html"),
            styles: [__webpack_require__(/*! ./fighters.component.scss */ "./src/app/streetfighter/containers/fighters/fighters.component.scss")]
        })
    ], FightersComponent);
    return FightersComponent;
}());



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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");

var updateCardsList = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Update cards list.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var createCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Create card.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var updateCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Update card.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var deleteCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Delete cards.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var selectCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Select card.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var unselectCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cards] Unselect card.');


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store/actions/app.actions */ "./src/app/store/actions/app.actions.ts");
/* harmony import */ var _core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/store/actions/core.actions */ "./src/app/core/store/actions/core.actions.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");









var CardsEffects = /** @class */ (function () {
    function CardsEffects(action$, firestore) {
        var _this = this;
        this.action$ = action$;
        this.firestore = firestore;
        this.updateCardsList$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(function () {
            return _this.firestore.collection('fighters').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (cards) { return Object(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["updateCardsList"])({ cards: cards }); }));
        });
        this.updateCard$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(function () { return _this.action$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["updateCard"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])(function (action) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(_this.firestore.doc("fighters/" + action.card.id).set(action.card)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])([
                Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__["navigateTo"])({ commands: ['core', 'layout', 'streetfighter', 'fighters'] }),
                Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({ message: action.card.name + " updated", config: {} })
            ]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({
                message: 'Something went wrong.', config: {
                    duration: 5000
                }
            })); }));
        })); });
        this.deleteCard$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(function () { return _this.action$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["deleteCard"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])(function (action) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(_this.firestore.doc("fighters/" + action.id).delete()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])([
                Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__["navigateTo"])({ commands: ['core', 'layout', 'streetfighter', 'fighters'] }),
                Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({ message: 'Card deleted', config: {} })
            ]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({
                message: 'Something went wrong.', config: {
                    duration: 5000
                }
            })); }));
        })); });
        this.createCard$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["createEffect"])(function () { return _this.action$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["ofType"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_3__["createCard"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])(function (action) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(_this.firestore.doc("fighters/" + _this.createId()).set({
                id: _this.newId,
                name: action.card.name,
                country: action.card.country,
                fightingStyle: action.card.fightingStyle
            })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])([
                Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_6__["navigateTo"])({ commands: ['core', 'layout', 'streetfighter', 'fighters'] }),
                Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({ message: action.card.name + " created", config: {} })
            ]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_7__["showSnackBar"])({
                message: 'Something went wrong', config: {
                    duration: 5000
                }
            })); }));
        })); });
    }
    CardsEffects.prototype.createId = function () {
        this.newId = this.firestore.createId();
        return this.newId;
    };
    CardsEffects.ctorParameters = function () { return [
        { type: _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["Actions"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] }
    ]; };
    CardsEffects = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], CardsEffects);
    return CardsEffects;
}());



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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/cards.actions */ "./src/app/streetfighter/store/actions/cards.actions.ts");
/* harmony import */ var _ngrx_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/entity */ "./node_modules/@ngrx/entity/fesm5/entity.js");




var cardAdapter = Object(_ngrx_entity__WEBPACK_IMPORTED_MODULE_3__["createEntityAdapter"])({
    selectId: function (fighter) { return fighter.id; },
    sortComparer: function (a, b) { return a.name.localeCompare(b.name); }
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
var initialState = cardAdapter.getInitialState();
// const initialState = cardAdapter.addAll(pog, cardAdapter.getInitialState());
var reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["updateCardsList"], function (state, _a) {
    var cards = _a.cards;
    return cardAdapter.addAll(cards, state);
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["selectCard"], function (state, _a) {
    var card = _a.card;
    return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { card: card }));
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["unselectCard"], _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["updateCard"], _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["createCard"], _actions_cards_actions__WEBPACK_IMPORTED_MODULE_2__["deleteCard"], function (state) {
    var card = state.card, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](state, ["card"]);
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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");


;
var fighterReducer = {
    cards: _cards_reducer__WEBPACK_IMPORTED_MODULE_0__["reducerCards"]
};
var getFighterState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createFeatureSelector"])('fighter');


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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _reducers_global_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/global.reducer */ "./src/app/streetfighter/store/reducers/global.reducer.ts");
/* harmony import */ var _reducers_cards_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/cards.reducer */ "./src/app/streetfighter/store/reducers/cards.reducer.ts");



var getCardsState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_reducers_global_reducer__WEBPACK_IMPORTED_MODULE_1__["getFighterState"], function (state) { return state.cards; });
var getAllCards = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getCardsState, function (state) { return _reducers_cards_reducer__WEBPACK_IMPORTED_MODULE_2__["cardAdapter"].getSelectors().selectAll(state); });
var getCard = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getCardsState, function (state) { return state.card; });


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _containers_fighters_fighters_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/fighters/fighters.component */ "./src/app/streetfighter/containers/fighters/fighters.component.ts");
/* harmony import */ var _containers_fighter_fighter_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/fighter/fighter.component */ "./src/app/streetfighter/containers/fighter/fighter.component.ts");





var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'fighters' },
    { path: 'fighters', component: _containers_fighters_fighters_component__WEBPACK_IMPORTED_MODULE_3__["FightersComponent"] },
    { path: 'fighter', component: _containers_fighter_fighter_component__WEBPACK_IMPORTED_MODULE_4__["FighterComponent"] }
];
var StreetFighterRoutingModule = /** @class */ (function () {
    function StreetFighterRoutingModule() {
    }
    StreetFighterRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], StreetFighterRoutingModule);
    return StreetFighterRoutingModule;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _street_fighter_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./street-fighter-routing.module */ "./src/app/streetfighter/street-fighter-routing.module.ts");
/* harmony import */ var _containers_fighters_fighters_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/fighters/fighters.component */ "./src/app/streetfighter/containers/fighters/fighters.component.ts");
/* harmony import */ var _containers_fighter_fighter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./containers/fighter/fighter.component */ "./src/app/streetfighter/containers/fighter/fighter.component.ts");
/* harmony import */ var _components_fighter_list_fighter_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/fighter-list/fighter-list.component */ "./src/app/streetfighter/components/fighter-list/fighter-list.component.ts");
/* harmony import */ var _components_fighter_detail_fighter_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/fighter-detail/fighter-detail.component */ "./src/app/streetfighter/components/fighter-detail/fighter-detail.component.ts");
/* harmony import */ var _core_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/shared/shared.module */ "./src/app/core/shared/shared.module.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_reducers_global_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./store/reducers/global.reducer */ "./src/app/streetfighter/store/reducers/global.reducer.ts");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _store_effects_cards_effects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./store/effects/cards.effects */ "./src/app/streetfighter/store/effects/cards.effects.ts");













var StreetFighterModule = /** @class */ (function () {
    function StreetFighterModule() {
    }
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
    return StreetFighterModule;
}());



/***/ })

}]);
//# sourceMappingURL=streetfighter-street-fighter-module-es5.js.map