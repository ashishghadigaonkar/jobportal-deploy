import requests
import sys
import json
from datetime import datetime

class JobPortalAPITester:
    def __init__(self, base_url="https://jobportal-deploy-5zfx.onrender.com"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.company_id = None
        self.job_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.session = requests.Session()

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=headers)
            elif method == 'POST':
                if files:
                    response = self.session.post(url, data=data, files=files, headers=headers)
                else:
                    headers['Content-Type'] = 'application/json'
                    response = self.session.post(url, json=data, headers=headers)
            elif method == 'PUT':
                if files:
                    response = self.session.put(url, data=data, files=files, headers=headers)
                else:
                    headers['Content-Type'] = 'application/json'
                    response = self.session.put(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_user_registration(self):
        """Test user registration"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_data = {
            "fullname": f"Test User {timestamp}",
            "email": f"testuser{timestamp}@example.com",
            "phoneNumber": f"123456{timestamp}",
            "password": "TestPass123!",
            "role": "student"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "api/v1/user/register",
            201,
            data=test_data
        )
        
        if success and 'user' in response:
            self.user_id = response['user'].get('_id')
            print(f"   User ID: {self.user_id}")
        
        return success

    def test_user_login(self):
        """Test user login"""
        timestamp = datetime.now().strftime('%H%M%S')
        login_data = {
            "email": f"testuser{timestamp}@example.com",
            "password": "TestPass123!",
            "role": "student"
        }
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "api/v1/user/login",
            200,
            data=login_data
        )
        
        if success and 'token' in response:
            self.token = response['token']
            print(f"   Token received: {self.token[:50]}...")
        
        return success

    def test_get_all_jobs(self):
        """Test getting all jobs"""
        success, response = self.run_test(
            "Get All Jobs",
            "GET",
            "api/v1/job/get",
            200
        )
        return success

    def test_company_registration(self):
        """Test company registration"""
        timestamp = datetime.now().strftime('%H%M%S')
        company_data = {
            "name": f"Test Company {timestamp}",
            "description": "A test company for API testing",
            "website": "https://testcompany.com",
            "location": "Test City"
        }
        
        success, response = self.run_test(
            "Company Registration",
            "POST",
            "api/v1/company/register",
            201,
            data=company_data
        )
        
        if success and 'company' in response:
            self.company_id = response['company'].get('_id')
            print(f"   Company ID: {self.company_id}")
        
        return success

    def test_get_companies(self):
        """Test getting companies"""
        success, response = self.run_test(
            "Get Companies",
            "GET",
            "api/v1/company/get",
            200
        )
        return success

    def test_post_job(self):
        """Test posting a job"""
        if not self.company_id:
            print("❌ Cannot test job posting - no company ID available")
            return False
            
        job_data = {
            "title": "Test Software Developer",
            "description": "A test job posting for API testing",
            "requirements": ["JavaScript", "React", "Node.js"],
            "salary": 50000,
            "experienceLevel": 2,
            "location": "Test City",
            "jobType": "Full-time",
            "position": 1,
            "company": self.company_id
        }
        
        success, response = self.run_test(
            "Post Job",
            "POST",
            "api/v1/job/post",
            201,
            data=job_data
        )
        
        if success and 'job' in response:
            self.job_id = response['job'].get('_id')
            print(f"   Job ID: {self.job_id}")
        
        return success

    def test_get_job_by_id(self):
        """Test getting job by ID"""
        if not self.job_id:
            print("❌ Cannot test get job by ID - no job ID available")
            return False
            
        success, response = self.run_test(
            "Get Job By ID",
            "GET",
            f"api/v1/job/get/{self.job_id}",
            200
        )
        return success

    def test_apply_for_job(self):
        """Test applying for a job"""
        if not self.job_id:
            print("❌ Cannot test job application - no job ID available")
            return False
            
        success, response = self.run_test(
            "Apply for Job",
            "GET",
            f"api/v1/application/apply/{self.job_id}",
            200
        )
        return success

    def test_get_applied_jobs(self):
        """Test getting applied jobs"""
        success, response = self.run_test(
            "Get Applied Jobs",
            "GET",
            "api/v1/application/get",
            200
        )
        return success

    def test_user_logout(self):
        """Test user logout"""
        success, response = self.run_test(
            "User Logout",
            "GET",
            "api/v1/user/logout",
            200
        )
        return success

def main():
    print("🚀 Starting Job Portal API Tests...")
    print("=" * 50)
    
    # Setup
    tester = JobPortalAPITester()
    
    # Test sequence
    tests = [
        ("User Registration", tester.test_user_registration),
        ("User Login", tester.test_user_login),
        ("Get All Jobs", tester.test_get_all_jobs),
        ("Company Registration", tester.test_company_registration),
        ("Get Companies", tester.test_get_companies),
        ("Post Job", tester.test_post_job),
        ("Get Job By ID", tester.test_get_job_by_id),
        ("Apply for Job", tester.test_apply_for_job),
        ("Get Applied Jobs", tester.test_get_applied_jobs),
        ("User Logout", tester.test_user_logout),
    ]
    
    # Run all tests
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
            tester.tests_run += 1
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the logs above for details.")
        return 1

if __name__ == "__main__":
    sys.exit(main())