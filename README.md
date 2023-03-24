I. Installation:

1. Install NodeJS
2. Go to source code directory
3. Run `npm install`
4. Run `npm start`
5. Open webbrowser and go to: http://localhost:3000/

II. Project:

1. Main features: Login, Invoice List, Create Invoice
2. Responsive: Yes
3. UI Library: Ant Design 5

III. Directory Structure:

src
├── apis : API
├── assets : Resource(imgage, ...)
├── components : Common Components
│   ├── auth
│   ├── base
│   │   ├── layout
│   │   │   ├── defaultLayout
│   │   │   └── protectedLayout
│   │   ├── loadingIndicator
│   │   ├── panelHeader
│   │   ├── requestInterceptor
│   │   └── sideBar
│   └── invoice
├── features : Features
│   ├── home
│   ├── invoices
│   │   ├── createInvoice
│   │   │   ├── createForm
│   │   │   │   ├── addresses
│   │   │   │   ├── bank
│   │   │   │   ├── basicInformation
│   │   │   │   ├── customFields
│   │   │   │   ├── customers
│   │   │   │   ├── documents
│   │   │   │   ├── extensions
│   │   │   │   └── items
│   │   ├── dataTable
│   └── login
├── helpers : Helper Functions
├── hooks : Common Custom Hooks
└── utils : Utilities Functions

IV. Issues:
I faced the CORS issue when I call `create invoice API` and I can not include: `"Operation-Mode": "SYNC"`
in request headers.
As I saw, althrough the server returns `200`, but `invoice` wasn't created successlly.
