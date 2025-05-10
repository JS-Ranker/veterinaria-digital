/**
 * Valida si un RUT chileno es válido
 * @param {string} rut - RUT a validar
 * @returns {boolean} - true si el RUT es válido, false en caso contrario
 */
export const validarRut = (rut: string): boolean => {
  // Eliminar puntos y guiones
  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');
  
  // Si tiene menos de 2 caracteres, es inválido
  if (rutLimpio.length < 2) return false;
  
  // Obtener dígito verificador y cuerpo del RUT
  const dv = rutLimpio.charAt(rutLimpio.length - 1).toUpperCase();
  const rutSinDv = rutLimpio.substring(0, rutLimpio.length - 1);
  
  // Si el cuerpo no es un número, es inválido
  if (!/^\d+$/.test(rutSinDv)) return false;
  
  // Calcular dígito verificador
  const dvCalculado = calcularDigitoVerificador(rutSinDv);
  
  // Comparar dígito verificador calculado con el proporcionado
  return dv === dvCalculado;
};

/**
 * Calcula el dígito verificador de un RUT chileno
 * @param {string} rutSinDv - RUT sin dígito verificador
 * @returns {string} - Dígito verificador calculado
 */
const calcularDigitoVerificador = (rutSinDv: string): string => {
  let suma = 0;
  let multiplicador = 2;
  
  // Sumar productos
  for (let i = rutSinDv.length - 1; i >= 0; i--) {
    suma += parseInt(rutSinDv.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  
  // Calcular dígito verificador
  const resto = suma % 11;
  const resultado = 11 - resto;
  
  // Determinar dígito verificador
  if (resultado === 11) return '0';
  if (resultado === 10) return 'K';
  return resultado.toString();
};

/**
 * Formatea un RUT con puntos y guión
 * @param {string} rut - RUT a formatear
 * @returns {string} - RUT formateado
 */
export const formatearRut = (rut: string): string => {
  // Eliminar puntos y guiones
  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');
  
  // Obtener dígito verificador y cuerpo del RUT
  const dv = rutLimpio.charAt(rutLimpio.length - 1);
  const rutSinDv = rutLimpio.substring(0, rutLimpio.length - 1);
  
  // Formatear con puntos
  let rutFormateado = '';
  let j = 0;
  for (let i = rutSinDv.length - 1; i >= 0; i--) {
    rutFormateado = rutSinDv.charAt(i) + rutFormateado;
    j++;
    if (j === 3 && i !== 0) {
      rutFormateado = '.' + rutFormateado;
      j = 0;
    }
  }
  
  // Agregar guión y dígito verificador
  return rutFormateado + '-' + dv;
};

/**
 * Limpia un RUT, eliminando caracteres no válidos y dejando solo números y K
 * @param {string} rut - RUT a limpiar
 * @returns {string} - RUT limpio
 */
export const limpiarRut = (rut: string): string => {
  // Si es undefined o null, devolver cadena vacía
  if (!rut) return '';
  
  // Eliminar todo excepto números y la letra K
  return rut.replace(/[^0-9kK]/g, '').toUpperCase();
};