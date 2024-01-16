# Express Typeorm Starterpack

## Pre-requirements

- [node-js](https://nodejs.org/en)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

## Getting started

- Clone the repository

```bash
git clone https://github.com/akmaldira/express-ts-template
```

- Install dependencies

```bash
cd express-ts-template
yarn install
```

- Update environments

```bash
cp .env.dev .env

// update all field in .env
```

- Run migration

```bash
yarn migration:run
```

## Typeorm Usage

- Create Migration

```bash
yarn migration:create
```

- Generate Migration

```bash
yarn migration:generate
```

- Run Migration

```bash
yarn migration:run
```

# Run Program

- Development

```bash
yarn dev
```

- Production

```bash
//change NODE_ENV in .env to production

yarn build

yarn start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
