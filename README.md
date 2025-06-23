# Wielowątkowy serwer chatu (z użyciem Flask i Socket.IO)
Projekt stanowi implementację wielowątkowego serwera chatu z graficznym interfejsem użytkownika. Każdy pokój rozmów (chat room) obsługiwany jest w osobnym wątku, 
co pozwala na jednoczesną i niezależną komunikację wielu użytkowników w wielu pokojach. Synchronizacja wiadomości jest zapewniona przez mechanizm kolejek komunikatów oraz wątki Pythona.

## Opis przyjętego rozwiązania

W projekcie zastosowano wiele wątków, w którym każdy pokój czatu obsługiwany jest dedykowany wątek (ChatThread). Wątki te działają równolegle, co pozwala na niezależną obsługę wielu pokoi oraz użytkowników bez wzajemnego blokowania.

### Wielowątkowość i synchronizacja
W projekcie wykorzystano:

* Wspólny bufor (lista) w każdym wątku pokoju, który przechowuje oczekujące na wysłanie wiadomości.

* Mutex (threading.Lock) do zabezpieczenia dostępu do bufora i zapobiegania jednoczesnym modyfikacjom przez różne wątki.

* Zmienną warunkową (threading.Condition) umożliwiającą wątkom czekanie na nowe wiadomości.

### Mechanizm działania
1. Gdy klient wysyła wiadomość, jest ona przekazywana do funkcji put_message() w wątku odpowiedniego pokoju, gdzie jest dodawana do bufora.
2. Następnie wątek pokoju jest powiadamiany o dostępności nowej wiadomości i budzony ze stanu oczekiwania.
3. Wątek pobiera wiadomość z bufora i emituje ją do wszystkich użytkowników obecnych w danym pokoju.
4. Cały czas, gdy nie ma nowych wiadomości, wątek pozostaje uśpiony.

## Zrealizowane wymagania projektowe
* Serwer tworzy osobny wątek dla każdego pokoju ✅
* Serwer dba o synchronizację wiadomości od klientów ✅
* Klient widzi wiadomości w chacie ✅
* Klient ma możliwość wysyłania wiadomości ✅
* Kod spełnia wymagania lintera (pylinta oraz eslinta) ✅
* Automatyczna analiza kodu na repozytorium ✅
* Dodatkowe feature’y: zamiast linii komend jest przystępny interfejs graficzny ✅

## Opis programu

Projekt składa się z dwóch głównych części:

**Backend** – wielowątkowy serwer napisany w Pythonie, wykorzystujący Flask i Flask-SocketIO do obsługi komunikacji w czasie rzeczywistym. Serwer zarządza pokojami czatu, wątkami odpowiedzialnymi za ich obsługę oraz synchronizacją wiadomości między użytkownikami.

**Frontend** – aplikacja napisana w React.js z użyciem Vite, zapewniająca wygodny i nowoczesny interfejs użytkownika. Umożliwia tworzenie i dołączanie do pokojów, wysyłanie i odbieranie wiadomości oraz wyświetlanie listy aktywnych użytkowników w czasie rzeczywistym.

Dzięki zastosowaniu WebSocketów komunikacja między frontendem a backendem odbywa się bez opóźnień, co zapewnia płynne działanie chatu.

## Uruchamianie programu
Po sklonowaniu repozytorium i zainstalowaniu wszystkich niezbędnych bibliotek zawartych w pliku ```requirements.txt```, należy wejść do folderu z frontendem:

```
$ cd frontend
```
A następnie uruchomić backend za pomocą komendy:
```
$ npm run backend
```
Klienta można uruchomić komendą:
```
$ npm run dev
```
Kolejnych klientów należy uruchomić za pomocą tej samej komendy. Będą oni uruchamiani na kolejnych portach, co pozwoli tworzyć wieloosobowe pokoje rozmów.

## Źródła:
* [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/)
* [threading docs](https://docs.python.org/3/library/threading.html)
* [multithreading in python](https://www.tutorialspoint.com/python/python_multithreading.htm)
* [Socket.IO docs](https://socket.io/)
* [Flask tutorial](https://www.youtube.com/watch?v=Z1RJmh_OqeA)
* [React docs](https://react.dev/)


