# Tabs

Tabs support two scenarios where tabs offer navigation within a page:
1. Using Links
1. Using Panels

## Structure
Tab components are composed using a collection of wrappers with individual node components. A structure used for links would be as follows:

```
Tabs
  Header
    HeaderLink
    HeaderLink
    HeaderLink
  /Header
  LinksPanel
    COMPONENT (child)
  /LinksPanel
  Actions (optional zero to many)
    Action
    Action
  /Actions
/Tabs
```

A structure using panels would be as follows:

```
Tabs
  Header
    HeaderItem - (View 1)
    HeaderItem - (View 2)
    HeaderItem - (View 3)
  /Header
  Panels
    Panel      - (View 1)
    Panel      - (View 2)
    Panel      - (View 3)
  /Panels
  Actions (optional zero to many)
    Action
    Action
  /Actions
/Tabs
```

**Panels are not implemented at time of implementation**

## Public Components

### Tabs
*Required*
Primary wrapper for all **Tabs** views

### Header
*Required*
Wrapper for **Header**, i.e. Tabs display

### LinksPanel
*Required (or, aternatively Panels)*
Wrapper for a component that manages a single view to react to route changes.   

Likely a Router Switch component.   

### Panels
*Required (or, aternatively LinksPanel)*
Wrapper for a colleciton of panels to traverse based on ```HeaderItem``` clicks.   

Alternative to routing & links, relies on having the same number of ```Panel``` components inside wrapper with ```HeaderItem``` as well.

### Actions
*Optional*
Displays additional actions outside the standard tab flow.

### Individual Pieces

#### Panel
When not using links, the ```Panels``` wrapper should maintain a collection of ```Panel``` components, each corresponding to a ```HeaderItem``` which controls navigation.   

Order of the ```Panel``` components should mirror the order of the ```HeaderItem``` components.

#### Action
An Action is additional item outside the standard tabs. These will be shown individually on desktop to the right of the tabs, or in a menu on mobile and when there are more than one action.

The ```Action``` component must be contained within an ```Actions``` wrapper.

#### HeaderItem
When not using links, and using panels, a ```HeaderItem``` will correspond to a tab.   

Each ```HeaderItem``` will allow traversing the ```Panel``` components, based on order.   

When using ```HeaderItem``` components, the primary views should use a ```Panels``` wrapper with a ```Panel``` wrapper for each.

The ```HeaderItem``` component must be contained within a ```Header``` wrapper.

#### HeaderLink
When using links, the ```HeaderLink``` will be a tab in the tab header.

```HeaderLink``` components are maintained via the route and will respond as such, showing active accordingly.

When using ```HeaderLink``` components, the panel should be a ```LinksPanel```.

The ```HeaderLink``` component must be contained within a ```Header``` wrapper.