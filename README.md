# myFlix Angular Client

A single-page Angular application for browsing and managing your favorite movies. Users can register, log in, view movie details, add/remove favorites, and update their profiles. This app connects to the [myFlix API](https://github.com/jamesfoday/myFlix-API).

---

## Features

- User registration & login (JWT authentication)
- Browse all movies, view details, filter and search
- Add or remove movies from favorites
- View/update user profile, delete account
- Responsive Angular Material design
- Dialogs for genre, director, and details
- Angular routing

---

## Demo

[Deployed App](https://jamesfoday.github.io/myflix-angular-client/)

---

## Tech Stack

- Angular
- TypeScript
- Angular Material
- RxJS
- TypeDoc for documentation

---

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/jamesfoday/myflix-angular-client.git
    cd myflix-angular-client
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```

---

## Running the App

- **Development server**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`

- **Production build**
    ```bash
    ng build --configuration production
    ```

---

## Documentation

- API docs: See [myFlix API backend](https://github.com/jamesfoday/myFlix-API/tree/main/out)
- TypeScript code documentation:
    - Generated with [TypeDoc](https://typedoc.org/)
    - Generate docs:
        ```bash
        npx typedoc src/app
        ```
    - Open the generated `/docs/index.html` in your browser

- All classes, components, and services are commented for TypeDoc.

---

## Contributing

1. Fork this repo
2. Create a new feature branch:  
    `git checkout -b feature/your-feature`
3. Commit your changes:  
    `git commit -m 'Add feature'`
4. Push to GitHub:  
    `git push origin feature/your-feature`
5. Open a Pull Request

---

## Credits

- [James Foday](https://github.com/jamesfoday)  
- CareerFoundry Full Stack Web Development Program  
- Angular, Angular Material, and the open source community

---

## License

MIT License

---

> **Declaration:**  
> Documentation and some code comments were generated and reviewed with OpenAI’s ChatGPT.  
> All code and docs are manually reviewed for accuracy.
