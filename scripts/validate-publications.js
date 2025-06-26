#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PUBLICATIONS_FILE = path.join(__dirname, '..', 'src', 'data', 'publications', 'publications.json');

function validatePublicationsJSON() {
  console.log('Validating publications.json...');
  
  try {
    // Check if file exists
    if (!fs.existsSync(PUBLICATIONS_FILE)) {
      console.error('❌ Error: publications.json file not found at:', PUBLICATIONS_FILE);
      process.exit(1);
    }

    // Read the file
    const content = fs.readFileSync(PUBLICATIONS_FILE, 'utf8');
    
    // Parse JSON to validate syntax
    const publications = JSON.parse(content);
    
    // Validate it's an array
    if (!Array.isArray(publications)) {
      console.error('❌ Error: publications.json must contain an array of publications');
      process.exit(1);
    }
    
    // Basic validation of publication entries
    publications.forEach((publication, index) => {
      if (!publication.title || !publication.authors || !publication.year || !publication.type) {
        console.error(`❌ Error: Publication at index ${index} is missing required fields (title, authors, year, type)`);
        process.exit(1);
      }
    });
    
    console.log(`✅ Publications JSON is valid! Found ${publications.length} publications.`);
    
  } catch (error) {
    console.error('❌ Error: Invalid JSON in publications.json');
    console.error('Details:', error.message);
    console.error('\nPlease fix the JSON syntax errors before committing.');
    console.error('Common issues:');
    console.error('- Missing commas after object properties');
    console.error('- Trailing commas in objects or arrays');
    console.error('- Unescaped quotes in strings');
    process.exit(1);
  }
}

validatePublicationsJSON();