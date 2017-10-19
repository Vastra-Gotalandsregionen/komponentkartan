# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

#### 0.2.0-rc1 - 0.2.0-rc10 (2017-10-19)
#### CardSectionComponent
- renamed subTitle to subtitle
- renamed editMode to readonly with default value true
#### CheckboxComponent
- renamed text to label
#### MonthpickerComponent
- renamed preselectedDate to selectedDate
- added validation with property required
#### DatepickerComponent
- added validation with property required
#### TextButtonComponent/ButtonComponent
- renamed TextButtonComponent to ButtonComponent
- renamed TextButtonComponent selector from vgr-text-button to vgr-button
- renamed TextButtonComponent.buttonClick to click
- renamed all css classes concerning .text-button to .button
#### LockButtonComponent
- changed events onLocked() and onUnlocked() to lockChanged(locked : boolean)
#### DropdownComponent
- SelectAllSelectedText and SelectAllItemText has been removed
- SelectAllItemText has been replaced with showAllItemText
- Default value for showAllItemText is "Visa alla"
- ShowAllItem in the dropdown is now always visible when the filter textbox is shown (before you had to set the SelectAllItemText for it to show)
- SelectAllSelectedText has been replaced with noItemSelectedLabel.
- noItemSelectedLabel is shown in the dropdown when no item is selected.
- It is no longer possible to deselect item once one is selected. You can still reselect something.
- added validation with property required
#### DropdownMultiselectComponent
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

