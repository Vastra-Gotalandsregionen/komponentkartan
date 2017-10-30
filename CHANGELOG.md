# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).
## 0.2.1 (2017-10-30)


### List component (former expandable-container-list)
- Expandable-container-list is replaced by list
- added property flexibleHeader. This is a replacement for the former class "list--inline", that will be set by the property instead
- removed Back-to-top component from the list

### Back-to-top
- No longer exists in the list component


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

