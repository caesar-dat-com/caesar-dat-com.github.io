import pygame
import random

# Inicializamos Pygame
pygame.init()

# Tamaño de la ventana (puedes ajustarlo o agregar la opción de "resizable")
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Animated Background")

clock = pygame.time.Clock()

# Lista de colores en formato HEX (igual que en tu JS)
COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1']
particles = []

class Particle:
    def __init__(self):
        # Posición inicial aleatoria
        self.x = random.random() * WIDTH
        self.y = random.random() * HEIGHT
        # Tamaño aleatorio (simulando "this.size = Math.random() * 2 + 1" en JS)
        self.size = random.random() * 2 + 1
        # Color aleatorio de la lista
        self.color_hex = random.choice(COLORS)
        # Convertimos el color de HEX a RGB para Pygame
        self.color = tuple(int(self.color_hex[i:i+2], 16) for i in (1, 3, 5))
        # Velocidad aleatoria (entre -0.25 y 0.25, igual que en el JS)
        self.speed_x = random.random() * 0.5 - 0.25
        self.speed_y = random.random() * 0.5 - 0.25

    def update(self):
        # Actualizamos la posición
        self.x += self.speed_x
        self.y += self.speed_y

        # Si la partícula se sale de los límites, invertimos la velocidad
        if self.x < 0 or self.x > WIDTH:
            self.speed_x *= -1
        if self.y < 0 or self.y > HEIGHT:
            self.speed_y *= -1

    def draw(self):
        # Dibujamos un círculo en la posición (x, y) con el radio = self.size
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), int(self.size))

def init_particles(num_particles):
    for _ in range(num_particles):
        particles.append(Particle())

def animate():
    running = True
    while running:
        # Control de FPS (60 frames por segundo)
        clock.tick(60)

        # Procesamos eventos (cerrar ventana, etc.)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        # Limpiamos la pantalla (fondo negro)
        screen.fill((0, 0, 0))

        # Actualizamos y dibujamos cada partícula
        for p in particles:
            p.update()
            p.draw()

        # Mostramos la pantalla actualizada
        pygame.display.flip()

    pygame.quit()

# Inicializamos 100 partículas y lanzamos la animación
init_particles(100)
animate()
