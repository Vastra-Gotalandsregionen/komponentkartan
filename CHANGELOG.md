# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Change-log](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

# 8.0.0 (2020-12-18)
- *Breaking change* Upgraded to angular 10.
- `vgr-filter-textbox` & `vgr-list` (and all of its child components) are now officially removed.
# 7.9.0 (2020-12-17)
- New and improved header-design
# 7.8.4 (2020-12-17)
- Revert of changes made in 7.8.3
# 7.8.2 (2020-12-11)
- Fixing a bug in `vgr-dropdown-select` where focus got stuck in filter if deselectable was active.
# 7.8.1 (2020-11-10)
- Various bugfixes for `vgr-dropdown-select`.


# 7.8.0 (2020-11-02)
- Added option for using `vgr-notification` as standalone and new types `warning`, `info`

# 7.7.0 (2020-11-02)
- Added backgroundColor property to `vgr-card-section`, white is default. Changed the look of the header to have borders all around. #480

# 7.6.0 (2020-10-28)
- Changed all components to use 'Component styles' and remade how theming works in the project.

# 7.5.2 (2020-10-23)
- Removed a unnecessary console log

# 7.5.1 (2020-09-30)
- Fix bug where styling of vgr-button would not work if angular build config was set to `optimization: true`. #474

# 7.5.0 (2020-09-28)
- Added action-event to `vgr-menu-item`
- Added outsideClick-event to `vgr-modal`

# 7.4.0 (2020-09-09)
- Created a `vgr-sort-arrow`-component, used internally in vgr-grid and available to be used inother components.
- Added possibility to add ARIA-attributes `vgr-input`

## 7.3.8 (2020-08-18)
- Fix randomly failing tests and update dependencies.

## 7.3.7 (2020-08-14)
- Fix bug where it was not possible to use tab to navigate buttons.
- Change scoll behavior in dropdowns: when reaching end of dropdown, scroll does not propagate to the main window anymore.

## 7.3.6 (2020-08-12)
- Improved visibility when activating buttons with keyboard. The button now changes size and appearence when "pressed" with keyboard, just as if clicked with mouse.

## 7.3.5 (2020-08-07)
- Modal dialog can be closed by pressing Escape.

## 7.3.4 (2020-08-05)
- Update button so that setting disabled also updates the disabled property on the button element.

## 7.3.3 (2020-07-02)
- Another bugfix for "Markera alla" in `vgr-dropdown-select`

## 7.3.2 (2020-07-01)
- Last version did not produce a working build, trying again.

## 7.3.1 (2020-06-30)
- Bugfix for "Markera alla" in `vgr-dropdown-select`

## 7.3.0 (2020-06-30)
- Changed the behavior for "Markera alla" in `vgr-dropdown-select`

## 7.2.1 (2020-06-09)
- Fixed a bug with `vgr-input` when it sometimes not trigger events.

## 7.2.0 (2020-05-22)
- Added setDisabled state for `vgr-dropdown`, `vgr-textarea` and `vgr-radio-group`

## 7.1.0 (2020-05-15)
- Added property for truncateLength on `vgr-card-section`

## 7.0.0 (2020-05-08)
- *Breaking change* `vgr-input` is updated, can now handle prefix and API more closely resembles HTML-input.
- `vgr-list-column-checkbox` & `vgr-list-column-trashcan` are now officially removed.
- *Deprecated* `vgr-filter-textbox` has been deprecated. `<vgr input type="search">` instead.
- *Deprecated* output event focus from `vgr-textarea`, `vgr-input`
- *Deprecated* output event blur from `vgr-textarea`
- Added [idForLabel] property on `vgr-textarea` to make it possible to connect label to it.
- Added [for] property for `vgr-title-value-heading` and changed it to use label instead of H4.
- Added public method focus() for  `vgr-textarea`, `vgr-input`, `vgr-dropdown` and `vgr-datepicker`.
- Makes it possible to programmatically set focus on the component.

## 6.1.0 (2020-02-25)
- Updated design of `vgr-button`.
- Changed margin between `vgr-checkbox` and it's label.
- Changed alignment of `vgr-textarea`, `vgr-dropdown`, `vgr-datepicker` & `vgr-button`

## 6.0.0 (2020-02-13)
- *Breaking change* Angular is upgraded to version 8.
- *Breaking change* `title-value` is now declarative using: `title-value-heading` and `title-value-container` as children.
- *Deprecated* `list` and `list-item`.
- Added width-handler for `vgr-datepicker`, `vgr-input` & `vgr-dropdown-select`
- Fixed `title-value-heading` and `title-value-container` now has a new property for defining it's width.
- Fixed `vgr-dropdown-select` uses `vgr-filter-textbox` for filtering.
- Fixed the handler of disable for `vgr-checkbox` in form control.

## 5.1.4 (2019-12-20)
- Restored possibility to start submenus expanded

## 5.1.3 (2019-10-21)
- Fixed another bug in "grid"-component regarding toggle animation.

## 5.1.2 (2019-10-17)
- Fixed bug in "grid"-component where content was not hidden during toggle animation.

## 5.1.1 (2019-10-16)
- Fixed bug in input "input"-component.

## 5.1.0 (2019-09-17)
- Added a new "grid"-component that will replace the list function in the future.
- Added a new "notification"-component that can be used with the grid component (and perhaps more components in the future).

## 5.0.4 (2019-09-24)
- Added event for valueChange for InputField and updated documentation.
- Fixed inputfield to support spacing and comma instead of dots for numbers.

## 5.0.3 (2016-06-28)
- Fixed a bug in listheader where buttons were not clickable

## 5.0.2 (2016-06-28)
- Fixed a bug in dropdown select where linebreaks inside dropdown item tags caused whitespaces to be added in start and ending in label.
- Fixed a bug in dropdown select readonly mode when text growing over other content instead och normal flow.

## 5.0.1 (2016-06-26)
- Fixed a bug where setting max date in datepicker broke the datepicker.

## 5.0.0 (2019-06-18)
- *Breaking change* Dropdown select now has a value input. As a result, the default input on dropdown items has been removed. If using dropdown select without a form control, set default values via the value input instead.
- *Breaking change* Monthpicker has been removed. Use datepicker with min zoom set to months instead.
- *Breaking change* Header Menu has been changed into a declarative component.
- *Breaking change* Icons replaced with font awesome, all other icons are removed
- Datepicker now allows text input and zooming between days, months and years views.
- Added event for expanded status to dropdown select.
- Fixed a bug where vgr-lists shared the same list-service but now resolves the service individually.
- Added method in modalService to update available tab stops in modal.
- Fixed color when editing validation field.
- Fixed WCAG-support for vgr-list and vgr-expandable-div.
- Added errorMessage to Dropdown select.
- Fixed focus on list on update.
- Fixed icons used on list-component.

## 4.2.0 (2019-05-02)
- Changed colors on validation
- Changed icons to use vgr-icons (continue).

## 4.1.0 (2019-04-30)
- Fixed a bug in List when multipleExpandedItems are not allowed and closing list-items did not emit any event.
- Fixed text for button select/deselect all in Dropdown multiselect when not bound to a form control.
- Modal background now correctly covers menus and headers.
- Input component: a bound form control is not changed on a DOM blur event.
- Fixing a bug in header menu where clicks get captured.
- Changed icons to use vgr-icons.
- Possible to prevent collapse of list-items in list.
- Suffix on input field will not cover text

## 4.0.0 (2019-02-08)
- *Breaking change* Angular is upgraded to version 7.
- *Breaking change* Dropdown and dropdown multiselect have been replaced by a declarative component called dropdown select.
- *Breaking change* Added new discreet style to vgr-button. Input secondary is removed and replaced by buttonStyle.
- *Breaking change* In vgr-list the sort ascending/descening icons have been switched around to reflect how it's usually used.
- *Breaking change* Added support for Font Awsome (free) as a pair dependency.
- List (specially the notifications) have been remade and restyled.
- Added a new component pagination.
- Added pagination to list component.
- Added a new component vgr-icon.
- Fixed a CSS-bug in vgr-table component.
- Prepared for deprecating vgr-list-column-checkbox & vgr-list-column-header-checkbox.
- The width for vgr-modal can increase between a min and max width by it's content.
- Changed Input Readonly mode to handle text longer than the input width. Longer texts will wrap in its own containing element.

## 3.2.2 (beta)
- Changed modal-css to allow it to be placed outside of root.
- Removed the need fo rxjs-compat, all should be upgraded for rxjs6.

## 3.2.1 (2018-10-05)
- Removed large font-size on long menu-headers
- Adjusted hover-effects on vgr-table.

## 3.2.0 (2018-10-04)
- Made ngx-perfect-scrollbar a dependency instead of a peer dependency.
- Remade Table-component to not depend on expandable-div and added possibility to have non expanded rows on level 1.
- Fixed a bug with action panel content being tabable when closed.

## 3.1.1 (2018-09-26)
- Expandable nested vgr-tables ane now bold on hover.
- Fixed a bug with dropdown multiselect search/filter not showing up.

## 3.1.0
- *Breaking change* Action panel should now be placed inside Page body, rather than directly inside Page.
- *Breaking change* Action panel has renamed inputs and outputs.
- *Breaking change* List flexible header is no longer bound to the state of an Action panel on the same page. To replicate the old behavior, bind the List flexibleHeader input to the same value as the Action panel open input.
- *Breaking change* vgr-list-column & vgr-list-column-header now renders flexible content insted of a fixed text (and fixed tooltip).
- Added a polyfill for smooth scrolling in back to top component. (is added in demo-page)
- Fixed a bug with overflow inside of card-sections.
- Added WCAG for cardSection and vgr-table.
- Fixed spacing between buttons laying next to each other.
- Added more options for how the header is displayed.
- Fixed a bug with dropdown multiselect options not being fully clickable.
- Fixed a bug in IE which made it impossible to click on page list rows
- Allowing list to not have a list header.
- Fixing bugs with events bubbeling down and closing card sections.
- It is now possible to freely place Action panels within a page, as well as have more than one Action panel.
- Page block can now be transparent.
- Readspeakers are now talking to you in list component.
- Fixed a bug with chevrons on nested tables beeing placed to low.

## 3.0.0
- Breaking change, uppgraded all dependencies to use Angular 6 and Angular-Cli 6
- Read https://update.angular.io/ on how to upgrade
- Moved komponentkartan lib folder from src/lib to projects/komponentkartan/lib
- Removed jquery
- Refactored back-to-top from javascript to Angular component
- Added toggle-button component
- Fixed a bug were elements were focused in collapsed action panels.
- Bugfix for card-section animation in IE.
- FilterText updated with new icon (themebased)
- Added a new component Searchresult
- Changed some icons to use SVG inseat of PNG

## 2.6.0
- Fixed smoother animations in list component
- Error message in list component
- Added ring with text component
- Bugfix in monthpicker and datepicker
- Bugfix in list component
- Added vgr-filter-tag and vgr-filter-tag-group components
- *Breaking change* vgr-lock-button unlocked input replaced with locked input
- *Breaking change* vgr-save-cancel unlocked input replaced with locked input

## 2.5.0
- WCAG-support for datepickern
- WCAG-support for the menu

## 2.4.1
- Fix bug with deselect on dropdown multi

## 2.4.0
- Added vgr-textarea component
- Updated vgr-page-header to be more flexible
- Add WCAG compliance to Montpicker component
- Add property noMonthSelectedLabel to Monthpicker
- Add property noDateSelectedLabel to Datepicker
- Added vgr-customized border to components on focus
- Fixed bug that makes the dropdown-multi component to push other components to the right that lies next to it
- vgr-button now wraps an HTML-button and has a type-property
- Fixed issue with line breaks in menu in Safari
- Possible to display radio group horizontally and vertically
- Smoother transition in dropdowns from radonly to edit mode
- Checkboxes in dropdown multi has the same height in checked and unchecked state
- Fixed bug with vgr-datepicker in vgr-actionpanel.

## 2.3.0
- Added vgr-table component

## 2.2.0
- Updated dropdownmulti to return full items instead of only displayname
- dropdown-components are now WCAG-compatible

## 2.1.2
- New component vgr-list-column-header-checkbox for checkboxes in list headers
- New declarative menu component. The previous menu component is no lomger supported.
- Implemented support for reactive forms reset in datepicker, montpicker and dropdowns.
- Radiogroup and checkbox now updates their values when used in a Reactive Form with update mode set to blur.
- Possibility to att custom content to modals. Removed ModalButtonConfiguration
- Added optional close button to Action Panel
- Add option to have no indentation of list-item content
- Add padding and hover effect to expandableDiv
- Added support to keep permanent notification when applying an eventdriven notification (ie NotifyOnCollapse)
- New version of Angular-Cli to 1.7.2
## 2.1.1
- Added support for AOT builds

## 2.1.0
- Added support in form-components; datepicker, monthpicker, input, dropdown, dropdown-multi to use  updateOn (submit, change, blur) from reactive forms. Reactive Forms reset will now clear all form values.
- Old form-components will no longer support non-reactive forms.
- Added WCAG for list-component and radio group

## 2.0.1
- Added component vgr-expandable-div
- Added component vgr-panel
- Added component vgr-title-value-layout, replace the divs that's having the class vgr-title-layout with this component instead.
- Fixed bug for back to top, It always appears no matter what resolution you have on your browser

## 2.0.0 (2018-01-04)
- Upgraded to Angular 5
- More examples added to komponentkartan-demo
- New path to library module, use: "vgr-komponentkartan" instead of old paths


## 0.3.3 (2017-12-05)
- Controls in a title-value-layout are now equally spaced and takes less room when in slim mode
- More examples added to komponentkartan-demo
- Route matching in the menu is now *exact*, disabling partial route matching

### Card component
- Card now supports a single-column layout
- Restructured card with new components, vgr-card-header and vgr-card-column.

### List component
- Added checkbox column, vgr-list-column-checkbox, that adds support for checkboxes in lists
- Added trashcan column, vgr-list-column-trashcan, that adds support for trashcan buttons in lists
- Added support for aligment on vgr-list-column-header. Left, center and right alignment is supported
- Altered structure for list: Replace the divs that having the classes list-item__header and list-item__content in your list with the components vgr-list-item-header and vgr-list-item-content.

### Input component
- Removed validation logic from input-component
- Added support for angular forms (i.e reactive forms or template driven forms)

## 0.3.0 (2017-11-07)

### Description of release
This release includes improved structure for both pages and lists. The aim is to make it simple to create a new page and add content.
*Note*: Introducing more structure means that some flexibility is lost. This is to support out known UX-designs in a simpler way.

### List component (former expandable-container-list)
- Expandable-container-list is replaced by list
- added property flexibleHeader. This is a replacement for the former class "list--inline", that will be set by the property instead
- removed Back-to-top component from the list, see section below.
- Addded new tags for more structure on the list. Vgr-list-header, vgr-list-column, vgr-list-column-header are added.
- Sorting added
- Automatic width adjustment of list columns based on header width

### Back-to-top
- No longer exists in the list component, add it on your app.component.html to enable it

### Page structure
- A page is now constructed by using vgr-page, vgr-page-header, vgr-page-body and vgr-page-block
- An action-panel can be added to the page by adding a vgr-action-panel on the page. When expanded, it drops down from the page header.

### DropdownComponent, DropdownMultiSelectComponent
- Readonly mode is changed to allow longer text to be displayed
- Animation added when transitioning between readonly true/false

### DatepickerComponent, MonthpickerComponent
- Animation added when transitioning between readonly true/false


## 0.2.0 (2017-10-24)

### Description of release
In this release we foucsed on standarization of property names, class names and tags.
We also added validation to a number of components. **NOTE!** there are breaking changes due to names changing. Please see each component below for a detailed description.

### CardSectionComponent
- renamed subTitle to subtitle
- renamed editMode to readonly with default value true
### CheckboxComponent
- renamed text to label
### MonthpickerComponent
- renamed preselectedDate to selectedDate
- added validation with property required
### DatepickerComponent
- added validation with property required
### TextButtonComponent/ButtonComponent
- renamed TextButtonComponent to ButtonComponent
- renamed TextButtonComponent selector from vgr-text-button to vgr-button
- renamed TextButtonComponent.buttonClick to click
- renamed all css classes concerning .text-button to .button
- internally, the button now listens to MouseDown instead of Click. The component still publishes Click as an event. This is due to validation components and the ordering of onBlur, onFocus, onClick and onMouseDown.
### LockButtonComponent
- changed events onLocked() and onUnlocked() to lockChanged(locked : boolean)
### DropdownComponent
- SelectAllSelectedText and SelectAllItemText has been removed
- SelectAllItemText has been replaced with showAllItemText
- Default value for showAllItemText is "Visa alla"
- ShowAllItem in the dropdown is now always visible when the filter textbox is shown (before you had to set the SelectAllItemText for it to show)
- SelectAllSelectedText has been replaced with noItemSelectedLabel.
- noItemSelectedLabel is shown in the dropdown when no item is selected.
- It is no longer possible to deselect item once one is selected. You can still reselect something.
- added validation with property required
### DropdownMultiselectComponent
- renamed displayAllItemsText to showAllItemText
- renamed selectAllSelectedText to allItemsSelectedLabel
- added selectAllItemText, this text is shown with the checkbox to enable select all items
- noItemSelectedLabel is shown in the dropdown when no item is selected.
- added validation with property required
### SaveCancelComponent
- renamed event onCancel to cancel
- renamed event onSave to save
- renamed event onUnlock to unlock
- renamed property enabled to unlocked
- to unlock programmatically, use unlocked = true.
### FilterTextBoxComponent
- renamed property filterValue to value
- renamed event inputChange to valueChanged
### ExpandableContainerList/ExpandableContainer
- Duplicate components added with new names List/ListItem
- The new tags will be vgr-list and vgr-list-item
- The old components will be valid, but are now **deprecated**
- Enabled lists standalone by using *.expandable-container-list--inline* or *.list--inline*

