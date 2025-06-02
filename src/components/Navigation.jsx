// src/components/Navigation.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiArchive, FiLogOut } from 'react-icons/fi'; // Sesuaikan ikon jika perlu

function Navigation({ logout, name }) {
  return (
    <nav className="navigation" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <Link 
        to="/archive" 
        className="nav-link nav-link--lg" // Gunakan kelas yang ada dari style.css
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <FiArchive style={{ marginRight: '5px' }} /> Arsip
      </Link>
      
      {/* Menampilkan nama pengguna dan tombol logout */}
      {name && ( // Hanya tampilkan jika nama (authedUser.name) ada
        <>
          <span className="mx-2 text-sm text-gray-400 tablet:hidden mobile:hidden">|</span> {/* Pemisah, bisa disesuaikan atau dihapus */}
          <span 
            className="text-on-surface" // Gunakan variabel CSS untuk warna teks
            style={{ marginRight: '10px' }}
          >
            Halo, {name}!
          </span>
          <button 
            onClick={logout} 
            className="button" // Gunakan kelas button dari style.css
            title="Logout"
            style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', fontSize: '0.9em' }}
          >
            <FiLogOut style={{ marginRight: '5px' }} /> Logout
          </button>
        </>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired, // Pastikan name juga required jika selalu ada saat login
};

export default Navigation;