export default class BookstoreService {
  data = [
    {
      id: 1,
      title: "The Simulation Hypothesis",
      author: "Rizwan Virk",
      price: 11,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51614uG09wL._SX331_BO1,204,203,200_.jpg"
    },
    {
      id: 2,
      title: "The Universe in a Nutshell",
      author: "Stephen William Hawking",
      price: 18,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/41t1GiTAXPL._SX376_BO1,204,203,200_.jpg"
    },
    {
      id: 3,
      title: "Hyperspace",
      author: "Michio Kaku",
      price: 13,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51JIXoZG32L._SX321_BO1,204,203,200_.jpg"
    },
    {
      id: 4,
      title: "The Relativity of All Things: Beyond Spacetime",
      author: "Laurent Nottale",
      price: 10,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/5147sG2OYdL._SX331_BO1,204,203,200_.jpg"
    },
    {
      id: 5,
      title: "The Future of the Mind:",
      author: "Michio Kaku",
      price: 16,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51MHKtad6yL._SX322_BO1,204,203,200_.jpg"
    },
    {
      id: 6,
      title: "The Complete Fiction of H. P. Lovecraft",
      author: "H. P. Lovecraft",
      price: 21,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51HcwfuOqnL._SX353_BO1,204,203,200_.jpg"
    },
    {
      id: 8,
      title: "Necronomicon",
      author: "H. P. Lovecraft",
      price: 28,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51We1j8PEkL._SX333_BO1,204,203,200_.jpg"
    },
    {
      id: 7,
      title:
        "The Elegant Universe: Hidden Dimensions, and the Quest for the Ultimate Theory",
      author: "Brian Greene",
      price: 28,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51g2zhYLXCL._SX325_BO1,204,203,200_.jpg"
    }
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      // resolve - когда всё было хорошо и мы получили данные
      setTimeout(() => {
        // Сделать так, что данные будут доступны через 700 милисекунд
        if (Math.random() > 0.75) {
          reject(new Error("Something bad happened"));
        } else {
          resolve(this.data);
        }
      }, 700);
    });
  }
}
