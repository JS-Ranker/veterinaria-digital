import { useState } from "react";
import {
  FaPaw,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaDog,
  FaCat,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import styles from "./AgendamientoCitas.module.css";

const AgendamientoCitas = () => {
  const [step, setStep] = useState<number>(1);
  const [ownerRut, setOwnerRut] = useState<string>("");
  const [petName, setPetName] = useState<string>("");
  const [petType, setPetType] = useState<"PERRO" | "GATO" | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Especialidades disponibles
  const specialties = [
    "Cardiología",
    "Oncología",
    "Endocrinología",
    "Gastroenterología",
    "Dermatología",
    "Oftalmología",
  ];

  // Horarios disponibles
  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ];

  // Generar años disponibles (actual hasta 2026)
  const availableYears = Array.from(
    { length: 3 },
    (_, i) => new Date().getFullYear() + i
  );

  // Obtener nombre del mes
  const getMonthName = (monthIndex: number) => {
    return new Date(currentYear, monthIndex).toLocaleString("es-ES", {
      month: "long",
    });
  };

  // Generar días del mes actual
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    // Días vacíos para alinear el calendario
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }

    return days;
  };

  const handleMonthChange = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty === selectedSpecialty ? null : specialty);
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar los datos del agendamiento
    console.log({
      ownerRut,
      petName,
      petType,
      selectedSpecialty,
      selectedDate,
      selectedTime,
    });

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setOwnerRut("");
    setPetName("");
    setPetType(null);
    setSelectedSpecialty(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setIsSubmitted(false);
  };

  const days = generateCalendarDays();
  const monthName = getMonthName(currentMonth);

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.confirmationMessage}>
          <div className={styles.confirmationIcon}>
            <FaCheck />
          </div>
          <h2 className={styles.confirmationTitle}>¡Cita Agendada!</h2>
          <p className={styles.confirmationText}>
            Hemos programado la cita para{" "}
            {selectedDate?.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            a las {selectedTime}.
          </p>
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={resetForm}
          >
            Agendar Nueva Cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <FaPaw /> Agendar Cita Veterinaria
      </h1>

      {/* Paso 1: Información del dueño y mascota */}
      {step === 1 && (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <FaUser /> Información del Dueño
          </div>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Ingrese RUT (ej: 12345678-9)"
            value={ownerRut}
            onChange={(e) => setOwnerRut(e.target.value)}
          />

          <div className={styles.sectionTitle}>
            <FaPaw /> Información de la Mascota
          </div>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Nombre de la mascota"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <div className={styles.sectionTitle}>Tipo de Mascota</div>
          <div className={styles.petTypeSelector}>
            <div
              className={`${styles.petTypeButton} ${
                petType === "PERRO" ? styles.active : ""
              }`}
              onClick={() => setPetType("PERRO")}
            >
              <FaDog /> PERRO
            </div>
            <div
              className={`${styles.petTypeButton} ${
                petType === "GATO" ? styles.active : ""
              }`}
              onClick={() => setPetType("GATO")}
            >
              <FaCat /> GATO
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => setStep(1)}
              disabled
            >
              <FaArrowLeft /> Atrás
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={() => setStep(2)}
              disabled={!ownerRut || !petName || !petType}
            >
              Siguiente <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Paso 2: Selección de especialidad y fecha */}
      {step === 2 && (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <FaPaw /> Especialidad Médica
          </div>

          <div className={styles.specialtyRadio}>
            {specialties.map((specialty) => (
              <div
                key={specialty}
                className={`${styles.radioOption} ${
                  selectedSpecialty === specialty ? styles.selected : ""
                }`}
                onClick={() => handleSpecialtySelect(specialty)}
              >
                <div className={styles.radioInput} />
                {specialty}
              </div>
            ))}
          </div>

          <div className={styles.sectionTitle}>
            <FaCalendarAlt /> Seleccione Fecha
          </div>

          <div className={styles.calendarHeader}>
            <div className={styles.calendarNav}>
              <button
                className={styles.calendarNavButton}
                onClick={() => handleMonthChange(-1)}
              >
                <FaArrowLeft />
              </button>
              <span className={styles.calendarTitle}>
                {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
              </span>
              <button
                className={styles.calendarNavButton}
                onClick={() => handleMonthChange(1)}
              >
                <FaArrowRight />
              </button>
            </div>
            <select
              className={styles.yearSelect}
              value={currentYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
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
                    : selectedDate &&
                      day.getDate() === selectedDate.getDate() &&
                      day.getMonth() === selectedDate.getMonth() &&
                      day.getFullYear() === selectedDate.getFullYear()
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
              <FaArrowLeft /> Atrás
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={() => setStep(3)}
              disabled={!selectedSpecialty || !selectedDate}
            >
              Siguiente <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Paso 3: Selección de hora y confirmación */}
      {step === 3 && (
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <FaClock /> Resumen de la Cita
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Mascota</span>
            <span className={styles.summaryValue}>
              {petName} ({petType})
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Especialidad</span>
            <span className={styles.summaryValue}>{selectedSpecialty}</span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Fecha seleccionada</span>
            <span className={styles.summaryValue}>
              {selectedDate?.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className={styles.sectionTitle}>Horarios Disponibles</div>

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
              <FaArrowLeft /> Atrás
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={handleSubmit}
              disabled={!selectedTime}
            >
              Confirmar Cita <FaCheck />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamientoCitas;
