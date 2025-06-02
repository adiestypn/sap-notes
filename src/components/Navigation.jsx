// src/components/Navigation.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import ThemeToggleButton from './ThemeToggleButton';
import LanguageToggleButton from './LanguageToggleButton';
import useTranslation from '../hooks/useTranslation';

function Navigation({ logout, name }) {
  const { t } = useTranslation();

  return (
    <nav className="navigation" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Link
        to="/archive"
        className="nav-link nav-link--lg"
        title={t('archiveLink')} // Tambahkan title jika perlu
      >
        {t('archiveLink')}
      </Link>

      <ThemeToggleButton />
      <LanguageToggleButton />

      {name && (
        <>
          <button
            onClick={logout}
            title={t('logoutButton')}
            className="logout-button"
          >
            <FiLogOut size={28} />
          </button>
          <span style={{ color: 'var(--on-surface)', marginLeft: '8px' }}>
            {name}
          </span>
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