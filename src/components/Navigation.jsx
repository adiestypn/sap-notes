// src/components/Navigation.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiArchive, FiLogOut } from 'react-icons/fi'; // Pastikan FiLogOut diimpor

function Navigation({ logout, name }) {
  return (
    <nav className="navigation" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <Link
        to="/archive"
        className="nav-link nav-link--lg"
      >
        Arsip {/* Teks Arsip tanpa ikon */}
      </Link>

      {/* Menampilkan ikon logout dan nama pengguna */}
      {name && (
        <>
          {/* Ikon Logout di sebelah kiri nama */}
          <button
            onClick={logout}
            title="Logout"
            style={{
              background: 'none', // Menghilangkan latar belakang button
              border: 'none', // Menghilangkan border button
              padding: '0', // Menghilangkan padding default button
              cursor: 'pointer', // Menjaga cursor pointer
              color: 'var(--on-surface)', // Menggunakan warna teks dari variabel CSS
              display: 'flex',
              alignItems: 'center',
              marginRight: '8px', // Memberi jarak antara ikon dan nama
            }}
          >
            <FiLogOut size={28} /> {/* Atur ukuran ikon jika perlu, contoh size={20} */}
          </button>

          <span
            className="text-on-surface" // Gunakan variabel CSS untuk warna teks
          >
            {name}
          </span>

          {/* Pemisah '|' mungkin tidak lagi diperlukan atau bisa dipindahkan/dihapus jika tata letak baru tidak cocok */}
          {/* <span className="mx-2 text-sm text-gray-400 tablet:hidden mobile:hidden">|</span> */}
        </>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;