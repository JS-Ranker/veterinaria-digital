import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Incluir ChangeDetectorRef
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.page.html',
  styleUrls: ['./registro-asistencia.page.scss'],
})
export class RegistroAsistenciaPage implements OnInit {
  isSupported = false; // Verificar si el dispositivo soporta el escáner de códigos
  asignaturas = [
    { codigo: 'PGY4121', nombre: 'Programación de Aplicaciones Móviles', qrLeidos: 0, porcentaje: 0 },
    { codigo: 'PGY4122', nombre: 'Desarrollo de Aplicaciones Web', qrLeidos: 0, porcentaje: 0 },
    { codigo: 'PGY4123', nombre: 'Bases de Datos', qrLeidos: 0, porcentaje: 0 },
    { codigo: 'PGY4124', nombre: 'Redes de Computadoras', qrLeidos: 0, porcentaje: 0 }
  ];
  barcodes: Barcode[] = []; // Guardar los códigos QR leídos
  correo: string = ''; // Variable para almacenar el correo del usuario logueado

  constructor(
    private alertController: AlertController,
    private apiService: ApiService,
    private dbService: DbService,
    private cdRef: ChangeDetectorRef  // Inyectamos ChangeDetectorRef al constructor
  ) {}

  ngOnInit() {
    // Verificar si el dispositivo soporta el escáner de códigos de barras
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    // Obtener el correo del usuario desde el almacenamiento local o desde un servicio de autenticación
    this.correo = localStorage.getItem('correo') || ''; // Cambia esto según tu lógica de autenticación
  }

  // Solicitar permisos para la cámara
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log('Permiso de cámara:', camera);  // Log de depuración
    return camera === 'granted' || camera === 'limited';
  }

  // Función para escanear el QR
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso denegado', 'Por favor, concede permiso para usar la cámara.');
      return;  // Si el permiso no es concedido, no proceder con el escaneo
    }

    const { barcodes } = await BarcodeScanner.scan(); // Iniciar el escaneo
    this.barcodes.push(...barcodes); // Guardar los códigos QR escaneados

    // Procesar cada código QR escaneado
    await this.processQrCodes(barcodes);
  }

  // Mostrar alerta con mensaje personalizado
  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Procesar los códigos QR
  async processQrCodes(barcodes: Barcode[]): Promise<void> {
    for (const barcode of barcodes) {
      const qrData = barcode.rawValue.split('|');
      if (qrData.length === 3) {
        const asignaturaCodigo = qrData[0];
        const nombreAsignatura = qrData[1];
        const fechaClase = qrData[2];

        // Verificar si la asistencia ya fue registrada para este código QR
        const asistenciaExistente = await this.dbService.existeAsistencia(asignaturaCodigo, fechaClase);

        if (asistenciaExistente) {
          await this.presentAlert('Aviso', 'Este código QR ya ha sido escaneado para esta asignatura.');
          continue; // Continuar al siguiente código QR sin registrar este
        }

        // Registrar la asistencia en la base de datos SQLite
        await this.dbService.registrarAsistencia(asignaturaCodigo, fechaClase, true);

        // Incrementar el contador de QR leídos para esta asignatura
        const asignatura = this.asignaturas.find(a => a.codigo === asignaturaCodigo);
        if (asignatura) {
          asignatura.qrLeidos++;
          // Calcular el porcentaje de asistencia basado en los QR leídos
          asignatura.porcentaje = this.calcularPorcentaje(asignatura.qrLeidos);  // Usamos la función para calcular el porcentaje
        }

        // Forzar la actualización de la vista
        this.cdRef.detectChanges();  // Esto asegura que la vista se actualice después de los cambios

        // Llamar a la API para marcar la asistencia
        await this.marcarAsistencia(asignaturaCodigo, nombreAsignatura, fechaClase); // Cambiar para enviar los valores correctos
      }
    }
  }

  // Método para calcular el porcentaje de asistencia
  calcularPorcentaje(qrLeidos: number): number {
    const totalClases = 10; // Total de clases esperadas (ajústalo si es necesario)
    return (qrLeidos / totalClases) * 100;
  }

  // Método para marcar la asistencia usando la API
  async marcarAsistencia(sigla: string, nombre: string, fecha: string): Promise<void> {
    if (!sigla || !nombre || !fecha) {
      await this.presentAlert('', 'Faltan datos para registrar la asistencia.');
      return;
    }

    // Llamada a la API para marcar la asistencia
    this.apiService.marcarAsistencia(sigla, nombre, fecha).subscribe(
      async (response) => {
        if (response.status === 'success') {
          // Asistencia marcada correctamente
          await this.presentAlert('Asistencia registrada', `La asistencia para la asignatura ${sigla} ha sido marcada con éxito.`);
        } else {
          // Error al marcar la asistencia
          await this.presentAlert('', response.message || 'No se pudo registrar la asistencia.');
        }
      },
      async (error) => {
        // Manejo de errores en la petición
        await this.presentAlert('', 'Hubo un problema al registrar la asistencia. Intenta de nuevo.');
      }
    );
  }
}
