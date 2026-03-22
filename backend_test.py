import requests
import sys
import json
from datetime import datetime

class SewawalaAPITester:
    def __init__(self, base_url="https://quick-booking-app.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200 and "Sewawala API" in response.text
            details = f"Status: {response.status_code}, Response: {response.text[:100]}"
            self.log_test("API Root Endpoint", success, details)
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, str(e))
            return False

    def test_create_booking(self):
        """Test booking creation"""
        booking_data = {
            "service": "AC Service & Repair",
            "name": "Test User",
            "phone": "9876543210",
            "email": "test@example.com",
            "address": "123 Test Street, Mumbai",
            "date": "2024-12-25",
            "time": "10:00 AM"
        }
        
        try:
            response = requests.post(f"{self.api_url}/bookings", json=booking_data, timeout=10)
            success = response.status_code == 200
            
            if success:
                booking = response.json()
                # Store booking ID for later tests
                self.test_booking_id = booking.get('id')
                details = f"Booking created with ID: {self.test_booking_id}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Create Booking", success, details)
            return success, booking if success else None
        except Exception as e:
            self.log_test("Create Booking", False, str(e))
            return False, None

    def test_get_bookings(self):
        """Test getting all bookings"""
        try:
            response = requests.get(f"{self.api_url}/bookings", timeout=10)
            success = response.status_code == 200
            
            if success:
                bookings = response.json()
                details = f"Retrieved {len(bookings)} bookings"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Get All Bookings", success, details)
            return success, bookings if success else []
        except Exception as e:
            self.log_test("Get All Bookings", False, str(e))
            return False, []

    def test_update_booking_status(self, booking_id):
        """Test updating booking status"""
        if not booking_id:
            self.log_test("Update Booking Status", False, "No booking ID available")
            return False
        
        update_data = {"status": "confirmed"}
        
        try:
            response = requests.patch(f"{self.api_url}/bookings/{booking_id}", json=update_data, timeout=10)
            success = response.status_code == 200
            
            if success:
                updated_booking = response.json()
                details = f"Status updated to: {updated_booking.get('status')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Update Booking Status", success, details)
            return success
        except Exception as e:
            self.log_test("Update Booking Status", False, str(e))
            return False

    def test_create_contact(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test Contact",
            "email": "contact@example.com",
            "phone": "9876543210",
            "message": "This is a test contact message"
        }
        
        try:
            response = requests.post(f"{self.api_url}/contact", json=contact_data, timeout=10)
            success = response.status_code == 200
            
            if success:
                contact = response.json()
                details = f"Contact created with ID: {contact.get('id')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Create Contact Message", success, details)
            return success
        except Exception as e:
            self.log_test("Create Contact Message", False, str(e))
            return False

    def test_get_contacts(self):
        """Test getting all contact messages"""
        try:
            response = requests.get(f"{self.api_url}/contact", timeout=10)
            success = response.status_code == 200
            
            if success:
                contacts = response.json()
                details = f"Retrieved {len(contacts)} contact messages"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Get All Contact Messages", success, details)
            return success
        except Exception as e:
            self.log_test("Get All Contact Messages", False, str(e))
            return False

    def test_invalid_booking(self):
        """Test booking creation with invalid data"""
        invalid_data = {
            "service": "AC Service & Repair",
            "name": "Test User",
            # Missing required fields
        }
        
        try:
            response = requests.post(f"{self.api_url}/bookings", json=invalid_data, timeout=10)
            success = response.status_code == 422  # Validation error expected
            details = f"Status: {response.status_code} (Expected 422 for validation error)"
            self.log_test("Invalid Booking Validation", success, details)
            return success
        except Exception as e:
            self.log_test("Invalid Booking Validation", False, str(e))
            return False

    def test_nonexistent_booking_update(self):
        """Test updating non-existent booking"""
        fake_id = "nonexistent-booking-id"
        update_data = {"status": "confirmed"}
        
        try:
            response = requests.patch(f"{self.api_url}/bookings/{fake_id}", json=update_data, timeout=10)
            success = response.status_code == 404  # Not found expected
            details = f"Status: {response.status_code} (Expected 404 for non-existent booking)"
            self.log_test("Non-existent Booking Update", success, details)
            return success
        except Exception as e:
            self.log_test("Non-existent Booking Update", False, str(e))
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Sewawala Backend API Tests")
        print("=" * 50)
        
        # Test API connectivity
        if not self.test_api_root():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Test booking endpoints
        booking_success, booking = self.test_create_booking()
        self.test_get_bookings()
        
        if booking_success and hasattr(self, 'test_booking_id'):
            self.test_update_booking_status(self.test_booking_id)
        
        # Test contact endpoints
        self.test_create_contact()
        self.test_get_contacts()
        
        # Test error handling
        self.test_invalid_booking()
        self.test_nonexistent_booking_update()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

def main():
    tester = SewawalaAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%",
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())