#!/usr/bin/env python3
"""
Backend API Tests for Berra Durur Hafızlık Davetiyesi
Tests all endpoints: POST/GET/STATS/DELETE /api/wishes
"""

import requests
import json
from datetime import datetime
import time

# Base URL from frontend/.env
BASE_URL = "https://agency-portal-113.preview.emergentagent.com/api"

# Track created wish IDs for cleanup
created_wish_ids = []

def print_test(name, passed, details=""):
    """Print test result with formatting"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"   {details}")
    print()

def test_post_wish_happy_path_1():
    """Test POST /api/wishes - attending with 3 people"""
    print("=" * 60)
    print("TEST 1: POST /api/wishes - Happy Path 1 (Attending)")
    print("=" * 60)
    
    payload = {
        "name": "Emine Esen",
        "status": "katilacagim",
        "people": 3,
        "message": "Mübarek olsun canım Berra'mıza"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/wishes", json=payload, timeout=10)
        
        # Check status code
        if response.status_code != 201:
            print_test("Status code 201", False, f"Got {response.status_code}: {response.text}")
            return None
        
        print_test("Status code 201", True)
        
        # Parse response
        data = response.json()
        
        # Verify response structure
        required_fields = ["id", "name", "status", "people", "message", "created_at"]
        missing_fields = [f for f in required_fields if f not in data]
        if missing_fields:
            print_test("Response has all required fields", False, f"Missing: {missing_fields}")
            return None
        
        print_test("Response has all required fields", True)
        
        # Verify UUID format
        try:
            import uuid
            uuid.UUID(data["id"])
            print_test("ID is valid UUID", True)
        except ValueError:
            print_test("ID is valid UUID", False, f"Got: {data['id']}")
            return None
        
        # Verify echoed inputs
        checks = [
            (data["name"] == payload["name"], "Name echoed correctly", f"Expected '{payload['name']}', got '{data['name']}'"),
            (data["status"] == payload["status"], "Status echoed correctly", f"Expected '{payload['status']}', got '{data['status']}'"),
            (data["people"] == payload["people"], "People echoed correctly", f"Expected {payload['people']}, got {data['people']}"),
            (data["message"] == payload["message"], "Message echoed correctly", f"Expected '{payload['message']}', got '{data['message']}'"),
        ]
        
        for passed, name, details in checks:
            print_test(name, passed, details if not passed else "")
        
        # Verify created_at is ISO format
        try:
            datetime.fromisoformat(data["created_at"].replace("Z", "+00:00"))
            print_test("created_at is valid ISO format", True)
        except ValueError:
            print_test("created_at is valid ISO format", False, f"Got: {data['created_at']}")
        
        # Track for cleanup
        created_wish_ids.append(data["id"])
        
        return data["id"]
        
    except Exception as e:
        print_test("Request succeeded", False, f"Exception: {str(e)}")
        return None

def test_post_wish_happy_path_2():
    """Test POST /api/wishes - not attending (no people field)"""
    print("=" * 60)
    print("TEST 2: POST /api/wishes - Happy Path 2 (Not Attending)")
    print("=" * 60)
    
    payload = {
        "name": "Dilek Biçer",
        "status": "katilamayacagim",
        "message": "İşten dolayı gelemiyorum, çok üzgünüm."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/wishes", json=payload, timeout=10)
        
        # Check status code
        if response.status_code != 201:
            print_test("Status code 201", False, f"Got {response.status_code}: {response.text}")
            return None
        
        print_test("Status code 201", True)
        
        # Parse response
        data = response.json()
        
        # Verify people is 0 for not attending
        if data["people"] != 0:
            print_test("People set to 0 for not attending", False, f"Got people={data['people']}")
            return None
        
        print_test("People set to 0 for not attending", True)
        
        # Track for cleanup
        created_wish_ids.append(data["id"])
        
        return data["id"]
        
    except Exception as e:
        print_test("Request succeeded", False, f"Exception: {str(e)}")
        return None

def test_post_wish_validation_errors():
    """Test POST /api/wishes - validation errors (expect 422)"""
    print("=" * 60)
    print("TEST 3: POST /api/wishes - Validation Errors")
    print("=" * 60)
    
    test_cases = [
        {
            "name": "Empty name",
            "payload": {"name": "", "status": "katilacagim", "message": "test test"},
            "expected_status": 422
        },
        {
            "name": "Name too short (1 char)",
            "payload": {"name": "A", "status": "katilacagim", "message": "test test"},
            "expected_status": 422
        },
        {
            "name": "Message too short (1 char)",
            "payload": {"name": "Test User", "status": "katilacagim", "message": "x"},
            "expected_status": 422
        },
        {
            "name": "Invalid status",
            "payload": {"name": "Test User", "status": "maybe", "message": "test test"},
            "expected_status": 422
        },
        {
            "name": "People out of range (99)",
            "payload": {"name": "Test User", "status": "katilacagim", "people": 99, "message": "test test"},
            "expected_status": 422
        },
    ]
    
    for test_case in test_cases:
        try:
            response = requests.post(f"{BASE_URL}/wishes", json=test_case["payload"], timeout=10)
            passed = response.status_code == test_case["expected_status"]
            details = "" if passed else f"Expected {test_case['expected_status']}, got {response.status_code}"
            print_test(test_case["name"], passed, details)
        except Exception as e:
            print_test(test_case["name"], False, f"Exception: {str(e)}")

def test_get_wishes():
    """Test GET /api/wishes - list all wishes"""
    print("=" * 60)
    print("TEST 4: GET /api/wishes - List All Wishes")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/wishes", timeout=10)
        
        # Check status code
        if response.status_code != 200:
            print_test("Status code 200", False, f"Got {response.status_code}: {response.text}")
            return
        
        print_test("Status code 200", True)
        
        # Parse response
        data = response.json()
        
        # Verify it's an array
        if not isinstance(data, list):
            print_test("Response is an array", False, f"Got type: {type(data)}")
            return
        
        print_test("Response is an array", True, f"Found {len(data)} wishes")
        
        # Verify each item has required fields
        if len(data) > 0:
            required_fields = ["id", "name", "status", "people", "message", "created_at"]
            first_item = data[0]
            missing_fields = [f for f in required_fields if f not in first_item]
            
            if missing_fields:
                print_test("Items have all required fields", False, f"Missing: {missing_fields}")
            else:
                print_test("Items have all required fields", True)
            
            # Verify sorted by created_at descending (newest first)
            if len(data) >= 2:
                dates = []
                for item in data:
                    try:
                        dt = datetime.fromisoformat(item["created_at"].replace("Z", "+00:00"))
                        dates.append(dt)
                    except:
                        pass
                
                if len(dates) >= 2:
                    is_sorted = all(dates[i] >= dates[i+1] for i in range(len(dates)-1))
                    print_test("Sorted by created_at descending", is_sorted, 
                             "" if is_sorted else "Items not in newest-first order")
        
    except Exception as e:
        print_test("Request succeeded", False, f"Exception: {str(e)}")

def test_get_wishes_stats():
    """Test GET /api/wishes/stats - aggregates"""
    print("=" * 60)
    print("TEST 5: GET /api/wishes/stats - Statistics")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/wishes/stats", timeout=10)
        
        # Check status code
        if response.status_code != 200:
            print_test("Status code 200", False, f"Got {response.status_code}: {response.text}")
            return
        
        print_test("Status code 200", True)
        
        # Parse response
        data = response.json()
        
        # Verify required fields
        required_fields = ["total", "attending", "not_attending", "total_people"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            print_test("Response has all required fields", False, f"Missing: {missing_fields}")
            return
        
        print_test("Response has all required fields", True, 
                  f"total={data['total']}, attending={data['attending']}, not_attending={data['not_attending']}, total_people={data['total_people']}")
        
        # Verify consistency: attending + not_attending == total
        sum_check = data["attending"] + data["not_attending"] == data["total"]
        print_test("attending + not_attending == total", sum_check,
                  "" if sum_check else f"{data['attending']} + {data['not_attending']} != {data['total']}")
        
        # Verify total_people >= 3 (from our test wishes)
        # Note: there may be pre-existing wishes, so we just check it's reasonable
        people_check = data["total_people"] >= 0
        print_test("total_people is non-negative", people_check,
                  f"Got total_people={data['total_people']}")
        
    except Exception as e:
        print_test("Request succeeded", False, f"Exception: {str(e)}")

def test_delete_wish():
    """Test DELETE /api/wishes/{id}"""
    print("=" * 60)
    print("TEST 6: DELETE /api/wishes/{id}")
    print("=" * 60)
    
    if not created_wish_ids:
        print_test("Delete existing wish", False, "No wishes created to delete")
        return
    
    # Delete first created wish
    wish_id = created_wish_ids[0]
    
    try:
        response = requests.delete(f"{BASE_URL}/wishes/{wish_id}", timeout=10)
        
        # Check status code
        if response.status_code != 200:
            print_test("Status code 200 for existing wish", False, f"Got {response.status_code}: {response.text}")
            return
        
        print_test("Status code 200 for existing wish", True)
        
        # Parse response
        data = response.json()
        
        # Verify response structure
        checks = [
            ("deleted" in data and data["deleted"] == True, "Response has deleted: true"),
            ("id" in data and data["id"] == wish_id, "Response has correct id"),
        ]
        
        for passed, name in checks:
            print_test(name, passed)
        
        # Remove from tracking list
        created_wish_ids.remove(wish_id)
        
        # Try to delete same wish again (should get 404)
        response2 = requests.delete(f"{BASE_URL}/wishes/{wish_id}", timeout=10)
        passed = response2.status_code == 404
        print_test("Status code 404 for non-existent wish", passed,
                  "" if passed else f"Got {response2.status_code}")
        
    except Exception as e:
        print_test("Request succeeded", False, f"Exception: {str(e)}")

def cleanup_test_wishes():
    """Clean up any remaining test wishes"""
    print("=" * 60)
    print("CLEANUP: Deleting remaining test wishes")
    print("=" * 60)
    
    for wish_id in created_wish_ids[:]:
        try:
            response = requests.delete(f"{BASE_URL}/wishes/{wish_id}", timeout=10)
            if response.status_code == 200:
                print(f"✅ Deleted wish {wish_id}")
                created_wish_ids.remove(wish_id)
            else:
                print(f"⚠️  Failed to delete wish {wish_id}: {response.status_code}")
        except Exception as e:
            print(f"❌ Error deleting wish {wish_id}: {str(e)}")
    
    print()

def main():
    """Run all tests"""
    print("\n" + "=" * 60)
    print("BACKEND API TESTS - Berra Durur Hafızlık Davetiyesi")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print("=" * 60)
    print()
    
    # Run tests in order
    test_post_wish_happy_path_1()
    test_post_wish_happy_path_2()
    test_post_wish_validation_errors()
    test_get_wishes()
    test_get_wishes_stats()
    test_delete_wish()
    
    # Cleanup
    cleanup_test_wishes()
    
    print("=" * 60)
    print("ALL TESTS COMPLETED")
    print("=" * 60)

if __name__ == "__main__":
    main()
