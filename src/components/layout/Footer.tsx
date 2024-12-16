import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Emplois Gabon</h3>
            <p className="text-sm">
              Votre plateforme de référence pour trouver un emploi au Gabon.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Rechercher un emploi</a></li>
              <li><a href="#" className="hover:text-white">Entreprises</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">À propos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: contact@emplois-gabon.ga</li>
              <li>Tél: +241 XX XX XX XX</li>
              <li>Libreville, Gabon</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Facebook /></a>
              <a href="#" className="hover:text-white"><Twitter /></a>
              <a href="#" className="hover:text-white"><Linkedin /></a>
              <a href="#" className="hover:text-white"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Emplois Gabon. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}