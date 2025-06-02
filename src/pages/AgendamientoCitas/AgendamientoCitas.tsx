import { useState } from "react";
import styles from "./AgendamientoCitas.module.css";

const AgendamientoCitas = () => {
  const [step, setStep] = useState(1);
  const [ownerRut, setOwnerRut] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<"PERRO" | "GATO" | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Datos de ejemplo para el calendario (mayo 2025)
  const currentMonth = new Date(2025, 4); // Mayo 2025 (0-11)
  const monthName = currentMonth.toLocaleString("es-ES", { month: "long" });
  const year = currentMonth.getFullYear();

  const daysInMonth = new Date(2025, 5, 0).getDate(); // 31 días en mayo
  const firstDayOfMonth = new Date(2025, 4, 1).getDay(); // Día de la semana del 1 de mayo

  // Generar días del mes
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Días vacíos para alinear el calendario
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(2025, 4, i));
  }

  // Especialidades disponibles
  const specialties = [
    "Cardiologia",
    "Oncologia",
    "Endocrinologia",
    "Gastroenterologia",
  ];

  // Horarios disponibles
  const timeSlots = [
    "6:00 - 7:00",
    "7:00 - 8:00",
    "8:00 - 9:00 (a.m.)",
    "9:00 - 10:00 (a.m.)",
    "10:00 - 11:00 (a.m.)",
    "11:00 - 12:00 (a.m.)",
    "12:00 - 13:00 (p.m.)",
    "13:00 - 14:00 (p.m.)",
    "14:00 - 15:00 (p.m.)",
    "15:00 - 16:00 (p.m.)",
    "16:00 - 17:00 (p.m.)",
    "17:00 - 18:00 (p.m.)",
  ];

  const handleSpecialtyToggle = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(
        selectedSpecialties.filter((s) => s !== specialty)
      );
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setStep(3); // Avanzar a selección de hora
    }
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar los datos del agendamiento
    console.log({
      ownerRut,
      petName,
      petType,
      selectedSpecialties,
      selectedDate,
      selectedTime,
    });
    alert("Cita agendada exitosamente!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agendar Visita</h1>

      {step === 1 && (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <span>RUT del dueño</span>
          </div>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Ingrese RUT (ej: 12345678-9)"
            value={ownerRut}
            onChange={(e) => setOwnerRut(e.target.value)}
          />

          <div className={styles.sectionTitle}>
            <span>Nombre de la mascota</span>
          </div>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Ingrese nombre de la mascota"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <div className={styles.sectionTitle}>
            <span>Tipo de mascota</span>
          </div>
          <div className={styles.petTypeSelector}>
            <div
              className={`${styles.petTypeButton} ${
                petType === "PERRO" ? styles.active : ""
              }`}
              onClick={() => setPetType("PERRO")}
            >
              PERRO
            </div>
            <div
              className={`${styles.petTypeButton} ${
                petType === "GATO" ? styles.active : ""
              }`}
              onClick={() => setPetType("GATO")}
            >
              GATO
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => setStep(1)}
            >
              Cancelar
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={() => setStep(2)}
              disabled={!ownerRut || !petName || !petType}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <span>Tipo de mascota: {petType}</span>
          </div>

          <div className={styles.sectionTitle}>
            <span>Especialidad</span>
          </div>
          <div className={styles.specialtyCheckboxes}>
            {specialties.map((specialty) => (
              <label key={specialty} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => handleSpecialtyToggle(specialty)}
                />
                {specialty}
              </label>
            ))}
          </div>

          <div className={styles.sectionTitle}>
            <span>Fecha</span>
            <div className={styles.calendarNav}>
              <button className={styles.calendarNavButton}>&lt;</button>
              <span className={styles.calendarTitle}>
                {monthName} de {year}
              </span>
              <button className={styles.calendarNavButton}>&gt;</button>
            </div>
          </div>

          <div className={styles.calendarGrid}>
            {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
              <div key={day} className={styles.calendarDayHeader}>
                {day}
              </div>
            ))}

            {days.map((day, index) => (
              <div
                key={index}
                className={`${styles.calendarDay} ${
                  !day
                    ? styles.empty
                    : selectedDate && day.getDate() === selectedDate.getDate()
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleDateSelect(day)}
              >
                {day ? day.getDate() : ""}
              </div>
            ))}
          </div>

          <div className={styles.actionButtons}>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => setStep(1)}
            >
              Atrás
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={() => selectedDate && setStep(3)}
              disabled={!selectedDate || selectedSpecialties.length === 0}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <span>Resumen de la cita</span>
          </div>
          <p>
            Mascota: {petName} ({petType})
          </p>
          <p>Especialidad(es): {selectedSpecialties.join(", ")}</p>
          <p>
            Fecha:{" "}
            {selectedDate?.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className={styles.sectionTitle}>
            <span>Seleccione hora</span>
          </div>
          <div className={styles.timeSlots}>
            {timeSlots.map((time) => (
              <div
                key={time}
                className={`${styles.timeSlot} ${
                  selectedTime === time ? styles.selected : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </div>
            ))}
          </div>

          <div className={styles.actionButtons}>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => setStep(2)}
            >
              Atrás
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={handleSubmit}
              disabled={!selectedTime}
            >
              Guardar Agendamiento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamientoCitas;
