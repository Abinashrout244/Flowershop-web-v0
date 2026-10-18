# Application structure

This React app uses an MVC-style separation adapted for a client-rendered UI.

## Model

`models/` owns data rules and access to Supabase. Models fetch and normalize
records; they do not contain React state or render UI.

## Controller

`controllers/` coordinates models with React state. Controller hooks expose
data, loading state, and errors to the views.

## View

`pages/` contains route-level views. `components/` contains reusable and
feature-specific view pieces. Views render controller state and handle
presentation and user interaction.

## App and shared state

`app/` configures routes and providers. Redux slices under `features/` own
shared cart, wishlist, and authentication state. `lib/` contains the shared
Supabase client; `styles/` contains global styling.

## Data flow

```text
View (page/component)
  -> Controller hook
    -> Model
      -> Supabase
    <- records
  <- records, loading, error
```

For example, `Shop.jsx` calls `useProductsController()`. The controller calls
`fetchProducts()` from `models/productModel.js`, then returns products and
request state for the view to render.
