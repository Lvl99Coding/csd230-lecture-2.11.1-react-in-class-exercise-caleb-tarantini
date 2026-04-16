package csd230;


import com.github.javafaker.Commerce;
import com.github.javafaker.Faker;
import csd230.entities.*;
import csd230.repositories.CartEntityRepository;
import csd230.repositories.ProductEntityRepository;
import csd230.repositories.UserEntityRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class Application implements CommandLineRunner {
    private final ProductEntityRepository productRepository;
    private final CartEntityRepository cartRepository;
    private final UserEntityRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public Application(ProductEntityRepository productRepository,
                       CartEntityRepository cartRepository,
                       UserEntityRepository userRepository,
                       PasswordEncoder passwordEncoder
    ) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        Faker faker = new Faker();
        Commerce cm = faker.commerce();
        com.github.javafaker.Number number = faker.number();
        com.github.javafaker.Book fakeBook = faker.book();
        String name = cm.productName();
        String description = cm.material();

        for (int i = 0; i < 10; i++) {
            // We call the faker methods inside the loop so each book gets unique data
            String title = faker.book().title();
            String author = faker.book().author();
            String priceString = faker.commerce().price();

            // Create the book entity with the random data
            BookEntity book = new BookEntity(
                    title,
                    Double.parseDouble(priceString),
                    10,      // Defaulting to 10 copies each
                    author
            );

            ElectricGuitarEntity eguitar = new ElectricGuitarEntity(
                    "Fender",
                    faker.rockBand().name(),
                    faker.number().numberBetween(4,9),
                    faker.number().numberBetween(1,3),
                    faker.number().randomDouble(2, 500, 2000)
            );

            AcousticGuitarEntity acguitar = new AcousticGuitarEntity(
                    "Martin",
                    faker.rockBand().name(),
                    faker.number().numberBetween(4,12),
                    faker.random().nextBoolean(),
                    faker.number().randomDouble(2, 500, 2000)
            );

            MagazineEntity magazine = new MagazineEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(1, 100),
                    faker.number().numberBetween(1, 12),
                    faker.date().past(365, java.util.concurrent.TimeUnit.DAYS).toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate()
            );

            TicketEntity ticket = new TicketEntity(
                    faker.rockBand().name(),
                    faker.number().randomDouble(2, 20, 200)
            );

            DiscMagEntity discMag = new DiscMagEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(1, 100),
                    faker.number().numberBetween(1, 12),
                    faker.date().past(365, java.util.concurrent.TimeUnit.DAYS).toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate(),
                    faker.random().nextBoolean()
            );

            ComicBookEntity comicBook = new ComicBookEntity(
                    faker.book().title(),
                    faker.book().author(),
                    faker.number().randomDouble(2, 5, 50),
                    faker.number().numberBetween(1, 30),
                    faker.book().genre()
            );

            TabletEntity tablet = new TabletEntity(
                    "Reading Tablet: " + faker.company().name(),
                    faker.number().randomDouble(2, 7, 15),
                    faker.number().randomDouble(2, 100, 1000)
            );

            // Save to database
            productRepository.save(book);
            productRepository.save(eguitar);
            productRepository.save(acguitar);
            productRepository.save(discMag);
            productRepository.save(magazine);
            productRepository.save(ticket);
            productRepository.save(comicBook);
            productRepository.save(tablet);

            System.out.println("Saved Book " + (i + 1) + ": " + title + " by " + author);
            System.out.println("Saved Electric Guitar " + (i + 1) + ": " + eguitar.getBrand() + " " + eguitar.getModel());
            System.out.println("Saved Acoustic Guitar " + (i + 1) + ": " + acguitar.getBrand() + " " + acguitar.getModel());
            System.out.println("Saved Magazine " + (i + 1) + ": " + magazine.getTitle());
            System.out.println("Saved Disc Magazine " + (i + 1) + ": " + discMag.getTitle());
            System.out.println("Saved Ticket " + (i + 1) + ": " + ticket.getDescription());
            System.out.println("Saved Comic Book " + (i + 1) + ": " + comicBook.getTitle());
            System.out.println("Saved Tablet " + (i + 1) + ": " + tablet.toString());
        }



        // ------------------------------------
        // CREATE USERS (Lecture 2.6)
        // ------------------------------------


        // Admin User (Can Add/Edit/Delete)
        UserEntity admin = new UserEntity("admin", passwordEncoder.encode("admin"), "ADMIN");
        userRepository.save(admin);


        // Regular User (Can only View/Buy)
        UserEntity user = new UserEntity("user", passwordEncoder.encode("user"), "USER");
        userRepository.save(user);


        System.out.println("Default users created: admin/admin and user/user");

        // Check if a cart exists, if not, create one
        if (cartRepository.count() == 0) {
            CartEntity defaultCart = new CartEntity();
            cartRepository.save(defaultCart);
            System.out.println("Default Cart created with ID: " + defaultCart.getId());
        }
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allow access to all /api endpoints from any origin
                registry.addMapping("/api/**").allowedOrigins("*");
            }
        };
    }



}
