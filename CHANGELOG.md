# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Change-log](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 3.0.1
- Added a polyfill for smooth scrolling in back to top component. (is added in demo-page)
- Fixed a bug with overflow inside of card-sections. 
- Added WCAG for cardSection.
- Fixed spacing between buttons laying next to each other.
- Added more options for how the header is displayed.

## 3.0.0 (Stable)
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

