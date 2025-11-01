-- Tambah personal baru Albert
INSERT INTO employees (name, position, join_date, years_of_experience, salary)
VALUES ('Albert', 'Engineer', '2024-01-24', 2.5, 50);

-- Update salary semua Engineer menjadi $85
UPDATE employees
SET salary = 85
WHERE LOWER(position) = 'engineer';

-- Hitung total pengeluaran salary pada tahun 2021
SELECT SUM(salary) AS total_salary_2021
FROM employees
WHERE join_date <= '2021-12-31'
  AND (release_date IS NULL OR release_date >= '2021-01-01');

-- Tampilkan 3 employee dengan pengalaman terbanyak
SELECT name, position, years_of_experience
FROM employees
ORDER BY years_of_experience DESC
LIMIT 3;

-- Subquery: Engineer dengan pengalaman ≤ rata-rata Engineer lain
SELECT *
FROM employees
WHERE position = 'Engineer'
  AND years_of_experience <= (
      SELECT AVG(years_of_experience)
      FROM employees
      WHERE position = 'Engineer'
  );
